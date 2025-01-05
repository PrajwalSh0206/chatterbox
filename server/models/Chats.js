const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Chats Table
const Chats = sequelize.define(
  "chats",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = { Chats };
