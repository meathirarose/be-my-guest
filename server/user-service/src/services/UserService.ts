import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../models/UserModel";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Register user method
    public async registerUser(name: string, email: string, password: string): Promise<IUser> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        const newUser = {
            name,
            email,
            password,
            role: 'customer',
            createdAt: new Date()
        };

        return await this.userRepository.create(newUser as IUser);
    }
}
