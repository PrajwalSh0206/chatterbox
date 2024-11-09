import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routers from "./routes/index.ts";
import loggerMiddleware from "./middleware/logger.ts";
import CustomLogger from "./utils/logger.ts";
import rateLimiter from "./middleware/rate-limiter.ts";
const router = new Router();
const PORT = 8000;
const logger = new CustomLogger("Server Listening At Port");

const app = new Application();
app.use(oakCors());

// Middleware Starts
app.use(rateLimiter);
app.use(loggerMiddleware);

// Routes Handler
app.use(routers.routes());
app.use(router.allowedMethods());
// Database Setup Starts

logger.info(PORT.toString());
await app.listen({ port: PORT });
