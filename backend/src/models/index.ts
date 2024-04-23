// sequelize.ts
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'nest',
  username: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5434, // Default PostgreSQL port
  dialect: 'postgres',
  models: [__dirname + './'], // Path to your Sequelize models
//   logging: false, // Set to true to log SQL queries
});

export default sequelize;
