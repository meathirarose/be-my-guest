import { IUserDoc, Role } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string, role: string): Promise<IUserDoc | null>;
    verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null>;
    signInUser(email: string, password: string): Promise<{ user: IUserDoc; token: string; refreshToken: string }>;
    refreshToken(refreshToken: string): Promise<string>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<Role | null>;
    changePassword(password: string, email: string): Promise<void>;
    googleLogin(idToken: string, role: string): Promise<{ user: IUserDoc; token: string; refreshToken: string }>;
    fetchAllCustomers(): Promise<IUserDoc[] | null>;
    fetchAllPropertyOwners(): Promise<IUserDoc[] | null>;
    fetchByUserId(userId: string): Promise<IUserDoc | null>;
    updateProfile(name: string, email: string, country: string, profileImage: string): Promise<IUserDoc>;
    updateUserStatus(userId: string, isBlocked: boolean): Promise<IUserDoc | null>;
}