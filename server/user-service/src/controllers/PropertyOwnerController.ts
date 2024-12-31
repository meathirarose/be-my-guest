import { Request, Response } from "express";
import { IPropertyOwnerController } from "../interfaces/IPropertyOwnerController";
import { PropertyOwnerService } from "../services/PropertyOwnerService";
import { signUpHostValidationSchema } from "../validations/SignUpHostValidation";
import { signInHostValidationSchema } from "../validations/SignInHostValidation";
import { BadRequestError } from "../errors/BadRequestError";
import { AuthService } from "../utils/jwt";

export class PropertyOwnerController implements IPropertyOwnerController{
    private propertyOwnerService: PropertyOwnerService;

    constructor() {
        this.propertyOwnerService = new PropertyOwnerService();
    }

    public registerPropertyOwner = async (req: Request, res: Response): Promise<void> => {

        try {
            console.log("hello from host register controller-----------------------------------");
            const { error, value } = signUpHostValidationSchema.validate(req.body, {abortEarly: false});

            if(error){
                const errorMessages = error.details.map(detail => detail.message);
                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }
    
            const { fullName, email, phoneNumber, country, password } = value;
    
            const user = await this.propertyOwnerService.registerPropertyOwner(fullName, email, phoneNumber, password, country);
    
            res.status(201).json({ message: "Property-Owner registered successfully!", data: user });
            
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    }

    public signInPropertyOwner = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('====================================');
            console.log("login start PropertyOwner------------------------");
            console.log('====================================');

            if (req.body.phoneNumber && typeof req.body.phoneNumber === "number") {
                req.body.phoneNumber = req.body.phoneNumber.toString();
            }
    
            // Validation for input
            const { error, value } = signInHostValidationSchema.validate(req.body, { abortEarly: false });
    
            if (error) {
                console.log(error);
                const errorMessages = error.details.map(detail => detail.message);
                res.status(400).json({ message: 'Validation error', error: errorMessages });
                return;
            }
    
            const { email, phoneNumber } = value;
    
            if (!email && !phoneNumber) {
                throw new BadRequestError("Email or Phone Number is required!");
            }
    
            const user = email 
                ? await this.propertyOwnerService.signInPropertyOwnerByMail(email) 
                : await this.propertyOwnerService.signInPropertyOwnerByPhoneNUmber(phoneNumber);
    
            if (!user) {
                throw new BadRequestError("User not found!");
            }
    
            // If user is found, generate the token
            const token = AuthService.generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            });
    
            console.log("token from signin controller-------------------------------------", token);
    
            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });
    
            console.log("hello after cookie----------------------------------------------------");
    
            res.status(200).json({
                message: "Login Successful!",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                }
            });
    
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
    
}