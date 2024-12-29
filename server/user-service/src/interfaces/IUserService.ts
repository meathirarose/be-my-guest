import { IUserDoc } from "./IUserModel";

export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string): Promise<IUserDoc>;
    verifyEmail(token: string): Promise<void>;
    signInUser(email: string, password: string): Promise<IUserDoc>;
    registerPropertyOwner(name: string, email: string, phoneNumber: number, password: string, country: string ): Promise<IUserDoc>;
}