// sequelize.ts
import { Sequelize } from "sequelize-typescript";
import { Logger } from "../utils/Logger";
const logger = new Logger("SQL_QUERY").createLogger();

const sequelize = new Sequelize({
  database: "nest",
  username: "postgres",
  password: "123",
  host: "localhost",
  port: 5434, // Default PostgreSQL port
  dialect: "postgres",
  models: [__dirname + "./"], // Path to your Sequelize models
  logging: (msg) => logger.info(msg),
});

export default sequelize;
