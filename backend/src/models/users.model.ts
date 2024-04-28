// src/models/User.ts
import { Model, DataTypes } from "sequelize";
import sequelize from "./index"; // Import Sequelize instance
import Authentication from "../utils/Authentication";

class User extends Model {
  public userId!: number;
  public username!: string; // Definite assignment assertion
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
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
  },
  {
    sequelize, // Pass the Sequelize instance
    modelName: "User", // Set the model name
    tableName: "user",
  }
);
User.beforeCreate(async (user) => {
  const authObj = new Authentication();
  const hashedPassword = authObj.hashPassword(user.password_hash);
  user.password_hash = hashedPassword;
});

export default User;
