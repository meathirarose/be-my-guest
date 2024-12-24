import { ValidationError } from "joi";
import { CustomError } from "./CustomError";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError) {
        super("Invalide request parameters");
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.details.map((error) => ({
            message: error.message,
            field: error.context?.key,
        }));
    }
}