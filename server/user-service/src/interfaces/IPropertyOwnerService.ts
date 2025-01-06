import { IUserDoc } from "./IUserModel";

export interface IPropertyOwnerService {
    registerPropertyOwner(name: string, email: string, password: string, country: string ): Promise<IUserDoc>;
    signInPropertyOwner(email: string, password: string): Promise<IUserDoc>;
}