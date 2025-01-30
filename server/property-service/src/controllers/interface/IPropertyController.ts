import { NextFunction, Request, Response } from "express";

export interface IPropertyController {
    basicInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
}