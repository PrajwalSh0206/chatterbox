import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes";
import morgan from "morgan";
import sequelize from "./src/models";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.use(bodyParser.json());
app.use(morgan("dev"));

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
