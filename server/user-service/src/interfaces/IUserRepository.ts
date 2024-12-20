import { FilterQuery } from "mongoose";
import { IUserDoc } from "./IUserModel";

export interface IUserRepository {
    saveUser(name: string, email: string, password: string, country: string): Promise<void>;
    findByEmail(email: string): Promise<IUserDoc | null>;
    update(filter: FilterQuery<IUserDoc>, update: Partial<IUserDoc>): Promise<IUserDoc | null>; 
}
