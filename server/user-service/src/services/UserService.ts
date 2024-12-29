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

    async verifyEmail(token: string): Promise<void> {
        try {

            const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string};
            
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new NotFoundError();
            }
        
            if (user?.verified) {
                throw new BadRequestError("User email is already verified");
            }
        
            const updatedUser = await this.userRepository.update(
                { email },
                { verified: true }
            );
        
            console.log("User verified successfully:", updatedUser);

        } catch (error) {
            
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

    public async registerPropertyOwner(
        name: string,
        email: string,
        phoneNumber: number,
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
            phoneNumber,
            password: hashedPassword,
            country,
            role: Role.PROPERTY_OWNER,
            verified: false,
        };
    
        const newUser = User.build(newUserAttrs);
        if (newUser) {
            await EmailService.sendVerificationMail(newUser.email);
        }
    
        return await this.userRepository.save(newUser as IUserDoc);
    }
    
}
