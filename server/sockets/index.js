const { Server } = require("socket.io");
const { FRONTEND_URL } = require("../constants");
const userSocket = require("./userSocket");
const { Logger } = require("../utils/logger");

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: { origin: FRONTEND_URL },
  });

  io.on("connection", (socket) => {
    const logger = new Logger(`Socket: ${socket.id}`);

    logger.info("Started");

    // Register event handlers for different modules
    userSocket(io, socket, logger);

    socket.on("disconnect", () => {
      logger.info(`Disconnected`);
    });
  });
};

module.exports = { createSocketServer };
