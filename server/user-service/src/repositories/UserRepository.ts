import { IUserAttrs, IUserDoc, Role } from "../interfaces/IUserModel"; 
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/UserModel";
import { BaseRepository } from "./BaseRepository";
import { FilterQuery } from "mongoose";  

export class UserRepository extends BaseRepository<IUserDoc> implements IUserRepository{

    constructor() {
        super(User);  
    }
    async createUser(name: string, email: string, password: string, country: string, role: string, verified: boolean): Promise<IUserDoc> {
        const attrs: IUserAttrs = { name, email, password, country, role: role as Role, verified };
        const user = User.build(attrs);
        return await this.save(user);
    }    
    
    async findByEmail(email: string): Promise<IUserDoc | null> {
        return this.findOne({ email }); 
    }

    async findByPhoneNumber(phoneNumber: number): Promise<IUserDoc | null> {
        return this.findOne({ phoneNumber }); 
    }

    async fetchAllCustomers(role: string): Promise<IUserDoc[]> {
        return await this.findAll({ role });
    }       

    async fetchAllPropertyOwners(role: string): Promise<IUserDoc[]> {
        return await this.findAll({ role });
    }

    async update(
        filter: FilterQuery<IUserDoc>,  
        update: Partial<IUserDoc>        
    ): Promise<IUserDoc | null> {
        return this.model.findOneAndUpdate(filter, update, { new: true });
    }
}
