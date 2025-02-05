import { NextFunction, Request, Response } from "express";

export interface IPropertyController {
    listProperty(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchProperties(req: Request, res: Response, next: NextFunction): Promise<void>;
}