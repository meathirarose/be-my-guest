import bcryptjs from "bcryptjs";
import { BadRequestError } from "../errors/BadRequestError";
import { IPropertyOwnerService } from "../interfaces/IPropertyOwnerService";
import { UserRepository } from "../repositories/UserRepository";
import { IUserAttrs, IUserDoc, Role } from "../interfaces/IUserModel";
import { User } from "../models/UserModel";
import { EmailService } from "../utils/emailSender";
import { NotFoundError } from "../errors/NotFoundError";

export class PropertyOwnerService implements IPropertyOwnerService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async registerPropertyOwner(
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
            role: Role.PROPERTY_OWNER,
            verified: false,
        };
    
        const newUser = User.build(newUserAttrs);
        if (newUser) {
            await EmailService.sendVerificationMail(newUser.email);
        }
    
        return await this.userRepository.save(newUser as IUserDoc);
    }

        async signInPropertyOwner(
            email: string, 
            password: string
        ): Promise<IUserDoc> {
    
            const existingUser = await this.userRepository.findByEmail(email);
    
            if (!existingUser) {
                throw new NotFoundError();
            }
    
            const passwordMatch = bcryptjs.compareSync(password, existingUser.password);
    
            if(!passwordMatch) {
                throw new BadRequestError("Invalid email or Password.!");
            }
    
            return existingUser;
        }
}