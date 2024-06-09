import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes";
import morgan from "morgan";
import sequelize from "./src/models";
import cors from "cors";
import AuthMiddleware from "./src/middleware/authMiddleware";
import { Server, Socket } from "socket.io";
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./src/dto/socket";
import { handleConnection, handleDisconnection } from "./src/sockets/connection";
import messageHandler from "./src/sockets/messageHandler";
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    throw new Error("Unauthorized User");
  }
  console.log("Username", username);
  socket.data.username = username;
  next();
});

// Socket.IO events
io.on("connection", (socket: Socket) => {
  handleConnection(io, socket);
  messageHandler(io, socket);
  handleDisconnection(io, socket);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = 5000;

app.use(express.json());

app.use(bodyParser.json());
app.use(morgan("dev"));

// Middlewares
const authObj = new AuthMiddleware();
app.use(authObj.verifyUser);

app.use(router);

process.on("uncaughtException", (err) => {
  console.log("Error", err);
});

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");

    server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Server running at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
