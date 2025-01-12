const { Sequelize } = require("sequelize");

console.log(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, process.env.POSTGRES_HOST);
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST || "localhost",
  dialect: "postgres",
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
