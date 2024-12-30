import bcryptjs from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { Role, IUserAttrs, IUserDoc } from "../interfaces/IUserModel";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { EmailService } from "../utils/emailSender";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { IUserService } from "../interfaces/IUserService";

const EMAIL_SECRET = process.env.EMAIL_SECRET || 'email-secret-key';

export class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    // Register user method
    public async registerUser(
        name: string, 
        email: string, 
        password: string, 
        country: string
    ): Promise<IUserDoc> {

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new BadRequestError("User with this email already exists.");
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

        return await this.userRepository.save(newUser as IUserDoc);
    };

    async verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null> {
        try {
            const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };
    
            const user = await this.userRepository.findByEmail(email);
    
            if (!user) {
                throw new NotFoundError();
            }
    
            if (user?.verified) {
                throw new BadRequestError("User email is already verified");
            }
    
            // Update the verified status
            await this.userRepository.update(
                { email },
                { verified: true }
            );
    
            console.log("User verified successfully:", user);
    
            // Return user details (including name, email, and role)
            return {
                name: user.name,
                email: user.email,
                role: user.role,
            };
    
        } catch (error) {
            console.error("Error in verifyEmail service:", error);
            throw error; // Re-throw the error to handle it in the controller
        }
    }
    

    async signInUser(
        email: string, 
        password: string
    ): Promise<IUserDoc> {

        const existingUser = await this.userRepository.findByEmail(email);
        console.log(existingUser, "signin user--------------------------------------------");

        if (!existingUser) {
            throw new NotFoundError();
        }

        const passwordMatch = bcryptjs.compareSync(password, existingUser.password);
        console.log(passwordMatch, "password match signin user-----------------------------");

        if(!passwordMatch) {
            throw new BadRequestError("Invalid email or Password.!");
        }

        return existingUser;
    }
    
}
