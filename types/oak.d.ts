// types/express.d.ts
import CustomLogger from "../server/utils/logger.ts";

declare module "@oak/oak" {
  interface Context {
    logger: CustomLogger;
  }
}
