import { FilterQuery } from "mongoose";
import { IUserDoc } from "./IUserModel";

export interface IUserRepository {
    createUser(name: string, email: string, password: string, country: string): Promise<IUserDoc>;
    findByEmail(email: string): Promise<IUserDoc | null>;
    update(filter: FilterQuery<IUserDoc>, update: Partial<IUserDoc>): Promise<IUserDoc | null>; 
}
