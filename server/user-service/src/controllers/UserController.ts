import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { signUpValidationSchema } from "../validations/SignUpUserValidation";
import { signInValidationSchema } from "../validations/SignInUserValidation";
import { BadRequestError } from "../errors/BadRequestError";
import { AuthService } from "../utils/jwt";
import { IUserController } from "../interfaces/IUserController";
import { signUpHostValidationSchema } from "../validations/SignUpHostValidation";

export class UserController implements IUserController{
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log("hello register-----------------------------");
            const { error, value } = signUpValidationSchema.validate(req.body, { abortEarly: false });

            if(error){
                const errorMessages = error.details.map(detail => detail.message);

                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { name, email, password, country } = value;
            console.log(value, "hello value from register--------------")

            const user = await this.userService.registerUser(name, email, password, country);
            console.log(user,"hello user--------------------from register user-------------")
            
            res.status(201).json({ message: "User created successfully!", data: user });

        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    };

    public verifyEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.query;
            console.log(token, "---------------------------------------------------------token");

            await this.userService.verifyEmail(token as string);
            res.status(200).json({ status: "success", message: "Email successfully verified." });

        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    };

    public signInUser = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('====================================');
            console.log("login start------------------------");
            console.log('====================================');

            const { error, value } = signInValidationSchema.validate(req.body, { abortEarly: false });

            if(error){
                console.log(error);
                const errorMessages = error.details.map(detail => detail.message);

                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { email, password } = value;

            if(!email || !password) {
                throw new BadRequestError("Email and Password are required!");
            }

            const user = await this.userService.signInUser(email, password);
            console.log(user, "user from signin controller-----------------------------------")
            const token = AuthService.generateToken( { 
                id: user.id, 
                email: user.email, 
                role: user.role
            });
            console.log("token from signin controller-----------------------------------", token)

            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });
            console.log("hello after cookie----------------------------------------------------")
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

    public registerPropertyOwner = async (req: Request, res: Response): Promise<void> => {
        console.log("hello register property owner-----------------------start--------------");
        console.log(req.body,"req body---------------------------------------------------------")
        try {
            const { error, value } = signUpHostValidationSchema.validate(req.body, {abortEarly: false});
            console.log(error, value, "error value----------------------------------------------")
            if(error){
                console.log(error, "error---------------------------------------------")
                const errorMessages = error.details.map(detail => detail.message);
                console.log(errorMessages, "error messages-------------------------")
                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }
    
            const { fullName, email, phoneNumber, country, password } = value;
            console.log(value, "value from host register-------------------------------------------");
    
            const user = await this.userService.registerPropertyOwner(fullName, email, phoneNumber, password, country);
            console.log(user, "hello user from host register controller-----------------------------------");
    
            res.status(201).json({ message: "Property-Owner registered successfully!", data: user });
            
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    }
}
