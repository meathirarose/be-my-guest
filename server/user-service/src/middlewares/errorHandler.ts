import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/CustomError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }else{
        console.error(err);
        res.status(500).json({ errors: [{ message: "Something went wrong" }] });
    }
};
