import { IUserDoc } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string): Promise<IUserDoc | null>;
    verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null>;
    signInUser(email: string, password: string): Promise<IUserDoc>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>;
    googleLogin(email: string, name: string, googleId: string, picture?: string): Promise<IUserDoc>;
    fetchAllCustomers(): Promise<IUserDoc[] | null>;
    updateProfile(name: string, email: string, country: string, profileImage: string): Promise<IUserDoc>;
}