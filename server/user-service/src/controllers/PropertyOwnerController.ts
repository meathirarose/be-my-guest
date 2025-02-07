import { NextFunction, Request, Response } from "express";
import { IPropertyOwnerController } from "../interfaces/IPropertyOwnerController";
import { PropertyOwnerService } from "../services/PropertyOwnerService";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { AuthService } from "../utils/jwt";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";

export class PropertyOwnerController implements IPropertyOwnerController{
    private propertyOwnerService: PropertyOwnerService;

    constructor(propertyOwnerService: PropertyOwnerService) {
        this.propertyOwnerService = propertyOwnerService;
    }

    public registerPropertyOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const { error, value } = signUpValidationSchema.validate(req.body, {abortEarly: false});

            if(error){
                const errorMessages = error.details.map(detail => detail.message);
                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }
    
            const { name, email, country, password } = value;
    
            const user = await this.propertyOwnerService.registerPropertyOwner(name, email, password, country);
    
            res.status(201).json({ message: "Property-Owner registered successfully!", data: user });
            
        } catch (error) {
            next(error)
        }
    }

    public signInPropertyOwner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
    
            // Validation for input
            const { error, value } = signInValidationSchema.validate(req.body, { abortEarly: false });
    
            if (error) {
                console.log(error);
                const errorMessages = error.details.map(detail => detail.message);
                res.status(400).json({ message: 'Validation error', error: errorMessages });
                return;
            }
    
            const { email, password } = value;

            if(!email || !password) {
                throw new BadRequestError("Email and Password are required!");
            }
    
            const user = await this.propertyOwnerService.signInPropertyOwner(email, password);
    
            if (!user) throw new NotFoundError("User not found!");

            if(user.isBlocked) throw new BadRequestError("Your account is blocked. Please contact support for further details")
    
            // If user is found, generate the token
            const token = AuthService.generateToken({
                id: user.id,
                email: user.email,
                role: user.role
            });
       
            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });
       
            res.status(200).json({
                message: "Login Successful!",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    country: user.country,
                    role: user.role,
                    token: token,
                    profileImage: user.profileImage
                }
            });
    
        } catch (error) {
            next(error);
        }
    }

    public fetchAllPropertyOwners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const propertyOwners = await this.propertyOwnerService.fetchAllPropertyOwners();

            if(!propertyOwners || propertyOwners.length === 0)
                throw new NotFoundError("No Property Owners found.");

            res.status(200).json({ message: "All Property Owners are fetched", data: propertyOwners });

        } catch (error) {
            next(error)
        }
    }
    
}