import { Context } from "@oak/oak";
import CustomLogger from "../utils/logger.ts";
import { Next } from "@oak/oak";

export default async function loggerMiddleware(ctx: Context, next: Next) {
  const uuid = self.crypto.randomUUID();
  const { method, url } = ctx.request;
  const title: string = `Method: ${method} | Url: ${url} | TxnId: ${uuid}`;
  const logger = new CustomLogger(title);
  ctx.logger = logger;
  ctx.logger.info("Logger Initialized");
  await next();
}
