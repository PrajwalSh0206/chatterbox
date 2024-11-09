export default class CustomError extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
