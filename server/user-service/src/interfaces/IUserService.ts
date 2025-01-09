import { IUserDoc } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string): Promise<IUserDoc>;
    verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null>;
    signInUser(email: string, password: string): Promise<IUserDoc>;
    googleLogin(email: string, name: string, googleId: string): Promise<IUserDoc>;
}