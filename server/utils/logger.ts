import Logger from "https://deno.land/x/logger@v1.1.6/logger.ts";

export default class CustomLogger {
  logger: Logger;
  title: string;
  constructor(title: string) {
    this.logger = new Logger();
    this.title = title;
  }

  updateInfo(message: string) {
    return new CustomLogger(this.title + message);
  }

  info(message: string) {
    this.logger.info(this.title, "|", message);
  }

  warn(message: string) {
    this.logger.warn(this.title, "|", message);
  }

  error(message: string) {
    this.logger.error(this.title, "|", message);
  }
}
