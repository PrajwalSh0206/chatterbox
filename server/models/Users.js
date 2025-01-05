const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, // e.g., 'online', 'offline'
      defaultValue: "offline",
    },
  },
  {
    timestamps: true,
  }
);

const columns = ["passwordHash"];

Users.beforeCreate(async (user) => {
  for (const element of columns) {
    if (user[element]) {
      user[element] = bcrypt.hashSync(user[element], saltRounds);
    }
  }
});

module.exports = { Users };
