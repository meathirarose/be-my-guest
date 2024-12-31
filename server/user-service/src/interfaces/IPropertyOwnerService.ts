import { IUserDoc } from "./IUserModel";

export interface IPropertyOwnerService {
    registerPropertyOwner(name: string, email: string, phoneNumber: number, password: string, country: string ): Promise<IUserDoc>;
    signInPropertyOwnerByMail(email: string): Promise<IUserDoc>;
    signInPropertyOwnerByPhoneNUmber(phoneNumber: number): Promise<IUserDoc>;
}