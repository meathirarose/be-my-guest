import { IUserDoc } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string): Promise<IUserDoc>;
    verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null>;
    signInUser(email: string, password: string): Promise<IUserDoc>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>;
    googleLogin(email: string, name: string, googleId: string): Promise<IUserDoc>;
    updateProfile(name: string, email: string, country: string): Promise<IUserDoc>;
}