const sequelize = require("../config/database");
const { Chats } = require("./Chats");
const { Messages } = require("./Messages");
const { Users } = require("./Users");

// Associations
Users.hasMany(Chats, { as: "Chats1", foreignKey: "user1Id" });
Users.hasMany(Chats, { as: "Chats2", foreignKey: "user2Id" });

Chats.belongsTo(Users, { as: "User1", foreignKey: "user1Id" });
Chats.belongsTo(Users, { as: "User2", foreignKey: "user2Id" });

Chats.hasMany(Messages, { foreignKey: "chatId" });
Messages.belongsTo(Chats, { foreignKey: "chatId" });
Messages.belongsTo(Users, { as: "Sender", foreignKey: "senderId" });

module.exports = { sequelize, Users, Chats };
