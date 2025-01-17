import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/RequestValidationError";
import Joi, { Schema } from "joi";

export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    // Log the validated value and error
    if (error) {
      throw new RequestValidationError(error.details);
    }

    next();
  };
};
