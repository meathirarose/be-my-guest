import { IUserDoc } from "../interfaces/IUserModel"; 
import { User } from "../models/UserModel";
import { BaseRepository } from "./BaseRepository";
import { FilterQuery } from "mongoose";  

export class UserRepository extends BaseRepository<IUserDoc> {

    constructor() {
        super(User);  
    }

    async findByEmail(email: string): Promise<IUserDoc | null> {
        return this.findOne({ email }); 
    }

    async update(
        filter: FilterQuery<IUserDoc>,  
        update: Partial<IUserDoc>        
    ): Promise<IUserDoc | null> {
        return this.model.findOneAndUpdate(filter, update, { new: true });
    }
}
