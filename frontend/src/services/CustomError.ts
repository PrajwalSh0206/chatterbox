export default class CustomError extends Error {
  status: number;
  error: any;
  constructor(message: string, status: number, err: any) {
    super(message);
    this.error = err;
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
