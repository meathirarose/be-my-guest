import { IUserDoc } from "../interfaces/IUserModel"; 
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../models/UserModel";
import { BaseRepository } from "./BaseRepository";
import { FilterQuery } from "mongoose";  

export class UserRepository extends BaseRepository<IUserDoc> implements IUserRepository{

    constructor() {
        super(User);  
    }

    async createUser(name: string, email: string, password: string, country: string): Promise<IUserDoc> {
        const user = new this.model({ name, email, password, country });
        return await user.save();
    }
    
    async findByEmail(email: string): Promise<IUserDoc | null> {
        return this.findOne({ email }); 
    }

    async findByPhoneNumber(phoneNumber: number): Promise<IUserDoc | null> {
        return this.findOne({ phoneNumber }); 
    }

    async update(
        filter: FilterQuery<IUserDoc>,  
        update: Partial<IUserDoc>        
    ): Promise<IUserDoc | null> {
        return this.model.findOneAndUpdate(filter, update, { new: true });
    }
}
