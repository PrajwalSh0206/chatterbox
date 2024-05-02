import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes";
import morgan from "morgan";
import sequelize from "./src/models";
import cors from "cors";
import AuthMiddleware from "./src/middleware/authMiddleware";
import { Server, Socket } from "socket.io";
const app = express();
const http = require("http");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
// Define an interface for the message object
interface Message {
  sender: string;
  content: string;
}

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Socket.IO events
io.on("connection", (socket: Socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const port = 5000;

app.use(express.json());

app.use(bodyParser.json());
app.use(morgan("dev"));

const authObj = new AuthMiddleware();
app.use(authObj.verifyUser);
app.use(router);

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
