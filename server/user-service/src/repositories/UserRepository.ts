import { IUser, User } from "../models/UserModel";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository<IUser> {

    constructor() {
        super(User);
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
}