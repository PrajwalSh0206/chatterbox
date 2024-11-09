import { Context } from "@oak/oak";
import CustomError from "../../utils/custom-error.ts";
import { STATUS_CODE } from "jsr:@oak/commons@1/status";
import CustomLogger from "../../utils/logger.ts";

export default async function signIn(ctx: Context, next: () => Promise<unknown>) {
  try {
    const logger: CustomLogger = ctx.logger;
    logger.info("check");
    ctx.response.status = STATUS_CODE.OK;
    ctx.response.body = {
      message: "Success",
    };
  } catch (error) {
    if (error instanceof CustomError) {
      ctx.response.body = {
        message: error.message || "Internal Server Error",
        error,
      };
    }
    await next();
  }
}
