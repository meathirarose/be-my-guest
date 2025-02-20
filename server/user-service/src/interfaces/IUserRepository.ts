import { FilterQuery, QueryOptions } from "mongoose";
import { IUserDoc } from "./IUserModel";

export interface IUserRepository {
    createUser(name: string, email: string, password: string, country: string, role: string, verified: boolean): Promise<IUserDoc>;
    findByEmail(email: string): Promise<IUserDoc | null>;
    findByPhoneNumber(phoneNumber: number): Promise<IUserDoc | null>;
    fetchAllCustomers(role: string): Promise<IUserDoc[]>;
    fetchAllPropertyOwners(role: string): Promise<IUserDoc[]>;
    findByUserId(userId: string): Promise<IUserDoc | null>;
    update(filter: FilterQuery<IUserDoc>, update: Partial<IUserDoc>, options?: QueryOptions): Promise<IUserDoc | null>;
    updateUserStatus(userId: string, isBlocked: boolean): Promise<IUserDoc | null>;
}
