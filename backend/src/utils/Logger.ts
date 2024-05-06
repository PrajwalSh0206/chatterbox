import winston, { format } from "winston";
const { combine, timestamp, printf, label, colorize } = format;

export class Logger {
  // Define log format
  functionName = "";
  filename = "";
  constructor(functionName: string) {
    this.functionName = functionName;
    this.filename = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
      .format(new Date())
      .toString()
      .split("/")
      .join("-");
    console.log(this.filename);
  }

  createLogger(): winston.Logger {
    const logger = winston.createLogger({
      level: "info",
      format: combine(
        label({ label: this.functionName }),
        timestamp(), // Add timestamp to logs
        printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${this.functionName} ${message}`;
        })
      ),

      transports: [
        new winston.transports.File({ filename: `./logger/${this.filename}_error.log`, level: "error" }),
        new winston.transports.File({ filename: `./logger/${this.filename}_combined.log` }),
        new winston.transports.Console(), // Log to console
      ],
    });
    return logger;
  }
}
