import { Request, Response } from "express";

export interface IUserController {
    registerUser(req: Request, res: Response): Promise<void>;
    verifyEmail(req: Request, res: Response): Promise<void>;
    signInUser(req: Request, res: Response): Promise<void>;
    registerPropertyOwner(req: Request, res: Response): Promise<void>;
}