const { createMessages } = require("../repositories/messages");

/**
 * Handles socket events.
 *
 * @param {import('socket.io').Server} io - The Socket.IO server instance.
 * @param {import('socket.io').Socket} socket - The connected Socket instance.
 * @param {import('winston').Logger} logger - The logger instance for logging events.
 */
module.exports = (io, socket, logger) => {
  // Handle message
  socket.on("sendMessage", (message) => {
    logger.info(`Receieved Message`, JSON.stringify(message));
    const { recipientSocketId, content, timestamp, senderId, chatId } = message;
    createMessages({
      chatId,
      senderId,
      content,
      sentAt: timestamp,
    });
    io.to(recipientSocketId).emit("handleMessage", { content, sentAt: timestamp, senderId });
  });
};
