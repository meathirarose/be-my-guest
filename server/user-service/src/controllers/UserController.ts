import { NextFunction, Request, Response } from "express";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { AuthService } from "../utils/jwt";
import { IUserController } from "../interfaces/IUserController";
import { verifyGoogleToken } from "../utils/authUtils";
import { resetPasswordValidationSchema } from "../validations/ResetPasswordValidation";
import { IUserService } from "../interfaces/IUserService";

export class UserController implements IUserController{
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    public registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = signUpValidationSchema.validate(req.body, { abortEarly: false });

            if(error){
                const errorMessages = error.details.map(detail => detail.message);

                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { name, email, password, country } = value;
            if(!value)
                throw new NotFoundError("Missing credentials!");

            const user = await this.userService.registerUser(name, email, password, country);
            if(!user)
                throw new BadRequestError("Unable to create a user account");
            
            res.status(201).json({ message: "Account created successfully!", data: user });

        } catch (error) {
            next(error)
        }
    };

    public verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token } = req.query;
            
            if(!token)
                throw new NotFoundError("Missing validation credentials");
    
            const user = await this.userService.verifyEmail(token as string);
            if(!user)
                throw new NotFoundError("User not found");
       
            res.status(200).json({ 
                status: "success", 
                message: "Email successfully verified.",
                user, 
            });
    
        } catch (error) {
            next(error);
        }
    };
    

    public signInUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
                throw new NotFoundError("Email and Password are required!");
            }

            const user = await this.userService.signInUser(email, password);
                
            if (!user) {
                throw new NotFoundError("User not found!");
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
                message: "Login Successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    country: user.country,
                    role: user.role,
                }
            });

        } catch (error) {
            next(error)
        }
    }

    public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new NotFoundError("Refresh token is missing!");
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
            next(error);
            return;
        }
    }

    public googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { idToken } = req.body;

            if (!idToken) {
                throw new NotFoundError("idToken is required!");
            }

            // Verify the Google token
            const payload = await verifyGoogleToken(idToken);
            if (!payload) {
                throw new BadRequestError("Invalid Google token!");
            }

            const { name = "", email, sub: googleId } = payload;

            if (!email || !googleId) {
                throw new NotFoundError("Google token is missing essential information!");
            }

            // Check if the user exists or create a new one
            const user = await this.userService.googleLogin(name, email, googleId);

            // Generate tokens
            const token = AuthService.generateToken({
                id: user.id,
                email: user.email,
                role: user.role,
            });

            const refreshToken = AuthService.generateRefreshToken({
                id: user.id,
                email: user.email,
                role: user.role,
            });

            // Set cookies
            res.cookie("accessToken", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            return res.status(200).json({
                message: "Login Successful!",
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    country: user.country,
                    role: user.role,
                    token: token,
                },
            });
        } catch (error) {
            next(error);  
            return; 
        }
    };

    public forgotPassword = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const { email } = req.body;

            if(!email) {
                throw new NotFoundError("No account found with the provided email address.");
            }

            await this.userService.forgotPassword(email);

            res.status(200).json({ 
                message: "A password reset link has been successfully sent to your email. Please follow the instructions to reset your password."
            });

        } catch (error) {
            next(error);
        }
    }

    public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { error, value } = resetPasswordValidationSchema.validate(req.body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                return res.status(400).json({ message: "Invalid input. Please check your input and try again.", error: errorMessages });
            }
            
            const { password, token } = value;

            if(!password || !token) {
                throw new NotFoundError("Required credentials are missing.")
            }

            await this.userService.resetPassword(password, token);
            
            return res.status(200).json({ message: "Your password has been updated successfully. You can now log in with your new password."
            });
        } catch (error) {
            next(error);
            return;
        }
    };

    public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            console.log("getting--------------------------------------------------------")
            const { name, email, country } = req.body;

            if(!name || !email || !country)
                throw new NotFoundError("Missing credentials!");

            const user = await this.userService.updateProfile(name, email, country);

            if(!user) {
                throw new NotFoundError("User not found")
            }

            return res.status(200).json({ message: "Profile updated successfully!", user });

        } catch (error) {
            next(error);
        }
    }
    

    public logoutUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('accessToken',{
                httpOnly: true,
                sameSite: "strict",
            });

            return res.status(200).json({message: "Logout successful!"});
        } catch (error) {
            next(error);
        }
    }

}
