// src/models/User.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "./index"; // Import Sequelize instance

class User extends Model {
  public userId?: number;
  public username!: string; // Definite assignment assertion
  public email!: string; // Definite assignment assertion
  public password_hash!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password_hash: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "User", // Set the model name
    tableName: "user",
  }
);

export default User;
