// errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });

  if (err instanceof CustomError) {
    console.log('Sending custom error response:', {
      statusCode: err.statusCode,
      errors: err.serializeErrors()
    });
    
    res.status(err.statusCode).json({ 
      status: 'error',
      errors: err.serializeErrors() 
    });
  } else {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
      status: 'error',
      errors: [{ message: "Something went wrong" }] 
    });
  }
};