import { IUserDoc, Role } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string, role: string): Promise<IUserDoc | null>;
    verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null>;
    signInUser(email: string, password: string): Promise<IUserDoc>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<Role | null>;
    changePassword(password: string, email: string): Promise<void>;
    googleLogin(email: string, name: string, googleId: string, role: string): Promise<IUserDoc>;
    fetchAllCustomers(): Promise<IUserDoc[] | null>;
    fetchAllPropertyOwners(): Promise<IUserDoc[] | null>;
    fetchByUserId(userId: string): Promise<IUserDoc | null>;
    updateProfile(name: string, email: string, country: string, profileImage: string): Promise<IUserDoc>;
    updateUserStatus(userId: string, isBlocked: boolean): Promise<IUserDoc | null>;
}