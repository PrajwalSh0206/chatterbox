let users = {}; // Track users and their statuses

module.exports = (io, socket, logger) => {
  // Handle user going online
  socket.on("userOnline", (userData) => {
    logger.info(`is online`);
    users[userData.userId] = { ...userData, socketId: socket.id, status: "online" };
    io.emit("updateUserList", users);
  });

  // Handle user going offline (on disconnect)
  socket.on("disconnect", () => {
    const userId = Object.keys(users).find((id) => users[id].socketId === socket.id);
    if (userId) {
      logger.info(`Disconnected`);
      users[userId].status = "offline";
      io.emit("updateUserList", users); // Broadcast updated user list
    }
  });
};
