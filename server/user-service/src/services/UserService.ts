import bcryptjs from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { Role, IUserAttrs, IUserDoc } from "../interfaces/IUserModel";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { EmailService } from "../utils/emailSender";

const EMAIL_SECRET = process.env.EMAIL_SECRET || 'email-secret-key';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Register user method
    public async registerUser(name: string, email: string, password: string, country: string): Promise<IUserDoc> {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUserAttrs: IUserAttrs = {
            name,
            email,
            password: hashedPassword,
            country,
            role: Role.CUSTOMER,
            verified: false
        };

        const newUser = User.build(newUserAttrs);
        if(newUser) {
            await EmailService.sendVerificationMail(newUser.email);
        }

        return await this.userRepository.create(newUser as IUserDoc);
    };

    async verifyEmail(token: string): Promise<void> {
        try {
            console.log("verify email starttt-------------------------------------")
            const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string};
            
            const user = await this.userRepository.findByEmail(email);

            console.log("User found-----------------", user);

            if (!user) {
                console.log("no user");
            }
        
            if (user?.verified) {
                console.log("User already verified");
            }
        
            const updatedUser = await this.userRepository.update(
                { email },
                { verified: true }
            );
        
            console.log("User verified successfully:", updatedUser);

        } catch (error) {
            
        }
    }
}
