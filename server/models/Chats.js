const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { Users } = require("./Users");

// Chats Table
const Chats = sequelize.define(
  "chats",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["user1Id", "user2Id"],
      },
    ],
  }
);

module.exports = { Chats };
