import winston from "winston";

export class CustomError extends Error {
  error = {};
  status = 500;
  constructor(message: string, status: number, error: any) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
    this.error = error;
    this.status = status;
  }
}

export class ErrorHandling {
  errorHandling(err: unknown, logger: winston.Logger) {
    let errorStatus: number = 500;
    let errorResponse = {
      ...(err || {}),
      message: "Api Failed For Unknown Reason",
    };
    if (err instanceof CustomError) {
      errorStatus = err.status;
      errorResponse = {
        ...err.error,
        message: err.message,
      };
      logger.error(`Error | ${JSON.stringify(err)} | Object | ${JSON.stringify(err.error)} | trace | ${err.stack}`);
    } else if (err instanceof Error) {
      errorResponse = {
        ...err,
        message: err.message,
      };
      logger.error(`Error | ${err} | trace | ${err.stack}`);
    } else {
      logger.error(`Error | ${err}`);
    }
    return { errorResponse, errorStatus };
  }
}
