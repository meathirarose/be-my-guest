import { Request, Response } from "express";

export interface IPropertyOwnerController {
    registerPropertyOwner(req: Request, res: Response): Promise<void>;
}