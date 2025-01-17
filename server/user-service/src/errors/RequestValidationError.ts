import { CustomError } from "./CustomError";
import { ValidationErrorItem } from "joi";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationErrorItem[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({
      message: error.message,
      field: error.context?.key,
    }));
  }
}
