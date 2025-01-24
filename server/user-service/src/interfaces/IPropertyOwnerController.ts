import { NextFunction, Request, Response } from "express";

export interface IPropertyOwnerController {
    registerPropertyOwner(req: Request, res: Response, next: NextFunction): Promise<void>;
    signInPropertyOwner(req: Request, res: Response, next: NextFunction): Promise<void>;
}