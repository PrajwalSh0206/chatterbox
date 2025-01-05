const sequelize = require("../config/database");
const { Chats } = require("./Chats");
const { Messages } = require("./Messages");
const { Users } = require("./Users");

// Associations
Users.belongsToMany(Users, {
  through: Chats,
  as: "Participants",
  foreignKey: "userId1",
  otherKey: "userId2",
});

Chats.hasMany(Messages, { foreignKey: "chatId" });
Messages.belongsTo(Chats, { foreignKey: "chatId" });
Messages.belongsTo(Users, { as: "Sender", foreignKey: "senderId" });

module.exports = { sequelize, Users, Chats };
