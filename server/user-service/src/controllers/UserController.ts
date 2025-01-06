import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { BadRequestError } from "../errors/BadRequestError";
import { AuthService } from "../utils/jwt";
import { IUserController } from "../interfaces/IUserController";

export class UserController implements IUserController{
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { error, value } = signUpValidationSchema.validate(req.body, { abortEarly: false });

            if(error){
                const errorMessages = error.details.map(detail => detail.message);

                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { name, email, password, country } = value;

            const user = await this.userService.registerUser(name, email, password, country);
            
            res.status(201).json({ message: "User created successfully!", data: user });

        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    };

    public verifyEmail = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.query;
    
            const user = await this.userService.verifyEmail(token as string);
       
            res.status(200).json({ 
                status: "success", 
                message: "Email successfully verified.",
                user, 
            });
    
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error });
        }
    };
    

    public signInUser = async (req: Request, res: Response): Promise<void> => {
        try {

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
                
            if (!user) {
                throw new BadRequestError("User not found!");
            }
            
            const token = AuthService.generateToken( { 
                id: user.id, 
                email: user.email, 
                role: user.role
            });

            const refreshToken = AuthService.generateRefreshToken({ 
                id: user.id, 
                email: user.email, 
                role: user.role 
            });

            res.cookie('accessToken', token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });

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

    public refreshToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new BadRequestError("Refresh token is missing!");
            }

            const decoded = AuthService.verifyRefreshToken(refreshToken);

            if (!decoded) {
                throw new BadRequestError("Invalid refresh token!");
            }

            // Generate new access token
            const newAccessToken = AuthService.generateToken({ 
                id: decoded.id, 
                email: decoded.email, 
                role: decoded.role 
            });

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            return res.status(200).json({
                message: "Tokens refreshed successfully",
                accessToken: newAccessToken,
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }

}
