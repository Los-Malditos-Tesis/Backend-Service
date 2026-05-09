export class AppError extends Error {
  constructor(message, statusCode = 500, code = null, additional) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    this.cause = additional;

    // Error.captureStackTrace(this, this.constructor)
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      cause: this.cause,
    };
  }
}
