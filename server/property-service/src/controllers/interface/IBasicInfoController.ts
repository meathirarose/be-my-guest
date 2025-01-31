import { NextFunction, Request, Response } from "express";

export interface IBasicInfoController {
    basicInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
}