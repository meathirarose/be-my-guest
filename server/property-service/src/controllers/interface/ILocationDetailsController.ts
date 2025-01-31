import { NextFunction, Request, Response } from "express";

export interface ILocationDetailsController {
    addLocationDetails(req: Request, res: Response, next: NextFunction): Promise<void>;
}