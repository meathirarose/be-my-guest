import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { BadRequestError } from "../errors/BadRequestError";
import { AuthService } from "../utils/jwt";
import { IUserController } from "../interfaces/IUserController";
import { verifyGoogleToken } from "../utils/authUtils";
import { count } from "console";
import { NotFoundError } from "../errors/NotFoundError";
import { resetPasswordValidationSchema } from "../validations/ResetPasswordValidation";

export class UserController implements IUserController{
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
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
                    name: user.name,
                    email: user.email,
                    country: user.country,
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

    public googleLogin = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { idToken } = req.body;

            if (!idToken) {
                throw new BadRequestError("idToken is required!");
            }

            // Verify the Google token
            const payload = await verifyGoogleToken(idToken);
            if (!payload) {
                throw new Error("Invalid Google token!");
            }

            const { name = "", email, sub: googleId } = payload;

            if (!email || !googleId) {
                throw new Error("Google token is missing essential information!");
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
            console.error(error);
            return res.status(400).json({ message: error });    
        }
    };

    public forgotPassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;

            if(!email) {
                throw new NotFoundError();
            }

            await this.userService.forgotPassword(email);

            res.status(200).json({ 
                message: "Password reset link sent to your email!",
            });

        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else if (error instanceof BadRequestError) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: "An unexpected error occurred." });
            }
        }
    }

    public resetPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { error, value } = resetPasswordValidationSchema.validate(req.body, { abortEarly: false });

            if (error) {
                console.error(error);
                const errorMessages = error.details.map((detail) => detail.message);
                return res.status(400).json({ message: 'Validation error', error: errorMessages });
            }
            
            const { password, token } = value;

            await this.userService.resetPassword(password, token);
            
            return res.status(200).json({ message: 'Password updated successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'An error occurred while resetting the password.' });
        }
    };

    public updateProfile = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { name, email, country } = req.body;

            const user = await this.userService.updateProfile(name, email, country);

            return res.status(200).json({ message: "Profile updated successfully!", user });

        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error });
        }
    }
    

    public logoutUser = async(req: Request, res: Response) => {
        try {
            res.clearCookie('accessToken',{
                httpOnly: true,
                sameSite: "strict",
            });

            return res.status(200).json({message: "Logout successful!"});
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error });
        }
    }

}
