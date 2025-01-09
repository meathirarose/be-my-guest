import { Request, Response } from "express";

export interface IUserController {
    registerUser(req: Request, res: Response): Promise<void>;
    verifyEmail(req: Request, res: Response): Promise<void>;
    signInUser(req: Request, res: Response): Promise<void>;
    refreshToken(req:Request,res:Response):Promise<Response>
    googleLogin(req:Request,res:Response):Promise<Response>
}