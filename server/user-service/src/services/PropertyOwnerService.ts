import bcryptjs from "bcryptjs";
import { BadRequestError } from "../errors/BadRequestError";
import { IPropertyOwnerService } from "../interfaces/IPropertyOwnerService";
import { UserRepository } from "../repositories/UserRepository";
import { IUserAttrs, IUserDoc, Role } from "../interfaces/IUserModel";
import { User } from "../models/UserModel";
import { EmailService } from "../utils/emailSender";

export class PropertyOwnerService implements IPropertyOwnerService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
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

    public async signInPropertyOwnerByMail(email: string): Promise<IUserDoc> {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestError("User not found!");
        }

        if (user.role !== Role.PROPERTY_OWNER) {
            throw new BadRequestError("Not allowed: You are not a property owner.");
        }

        return user;

    }

    public async signInPropertyOwnerByPhoneNUmber(phoneNumber: number): Promise<IUserDoc> {

        const user = await this.userRepository.findByPhoneNumber(phoneNumber);

        if (!user) {
            throw new BadRequestError("User not found!");
        }

        if (user.role !== Role.PROPERTY_OWNER) {
            throw new BadRequestError("Not allowed: You are not a property owner.");
        }

        return user;

    }
}