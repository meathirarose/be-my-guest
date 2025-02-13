import { NextFunction, Request, Response } from "express";

export interface IUserController {
    registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
    signInUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshToken(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
    googleLogin(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
    forgotPassword(req:Request,res:Response, next: NextFunction):Promise<void>;
    resetPassword(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
    changePassword(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
    updateProfile(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
    fetchAllCustomers(req:Request,res:Response, next: NextFunction): Promise<void>;
    updateUserStatus(req:Request, res:Response, next: NextFunction): Promise<void>;
    logoutUser(req:Request,res:Response, next: NextFunction):Promise<Response | void>;
}