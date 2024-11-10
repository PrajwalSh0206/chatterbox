import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routers from "./routes/index.ts";
import loggerMiddleware from "./middleware/logger.ts";
import CustomLogger from "./utils/logger.ts";
import rateLimiter from "./middleware/rate-limiter.ts";
import { db } from "./config/db/index.ts";
import CustomError from "./utils/custom-error.ts";
const router = new Router();
const PORT = 8000;

const app = new Application();
app.use(oakCors());

// Middleware Starts
app.use(rateLimiter);
app.use(loggerMiddleware);

// Routes Handler
app.use(routers.routes());
app.use(router.allowedMethods());
// Database Setup Starts

try {
  db.connect();
  new CustomLogger("Server Connected at Port").info(PORT.toString());
} catch (error) {
  let err = new CustomError("Something Went Wrong");
  if (error instanceof Error) err = error;
  new CustomLogger("Server Error").error(err.message);
}
