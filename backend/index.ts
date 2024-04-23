import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import router from "./src/routes";
import morgan from "morgan";
import sequelize from "./src/models";
import cors from 'cors'

const app = express();
const port = 5000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for My Express Server",
    },
  },
  apis: ["./routes/*.ts"], // Specify the path to your route files
};

const specs = swaggerJsdoc(options);
app.use(cors())

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(router);

// Sync Sequelize models with the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log(`Server running at http://localhost:${port}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
