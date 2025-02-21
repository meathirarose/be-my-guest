import { NextFunction, Request, Response } from "express";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@be-my-guest/common";
import { AuthService } from "../utils/jwt";
import { IUserController } from "../interfaces/IUserController";
import { verifyGoogleToken } from "../utils/authUtils";
import { resetPasswordValidationSchema } from "../validations/ResetPasswordValidation";
import { IUserService } from "../interfaces/IUserService";
import { changePasswordValidationSchema } from "../validations/ChangePasswordValidation";
import { updateProfileValidationSchema } from "../validations/UpdateProfileValidation";

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

            const { name, email, password, country, role } = value;

            const user = await this.userService.registerUser(name, email, password, country, role);
            if(!user) throw new BadRequestError("Unable to create a user account");
            
            res.status(201).json({ message: "Account created successfully!", data: user });

        } catch (error) {
            next(error)
        }
    };

    public verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token } = req.query;
                
            const user = await this.userService.verifyEmail(token as string);
            if(!user) throw new BadRequestError("Unable to verify email");
       
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
            if(error) {
                const errorMessages = error.details.map(detail => detail.message);
                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { email, password } = value;

            const user = await this.userService.signInUser(email, password);
            if(!user) throw new NotFoundError("User not found");
                
            if(user.isBlocked) throw new BadRequestError("Your account is blocked. Please contact support for further details");
            
            const tokenPayload = { id: user.id, email: user.email, role: user.role };
            const token = AuthService.generateToken(tokenPayload);
            const refreshToken = AuthService.generateRefreshToken(tokenPayload);

            res.cookie('accessToken', token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 });

            res.status(200).json({
                message: "Login Successfully",
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    country: user.country, 
                    role: user.role, 
                    profileImage: user.profileImage,
                    isBlocked: user.isBlocked,
                    token: token, 
                }
            });

        } catch (error) {
            next(error)
        }
    }
    public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) throw new NotFoundError("Refresh token is missing!");
            
            const decoded = AuthService.verifyRefreshToken(refreshToken);
            if (!decoded) throw new BadRequestError("Invalid refresh token!");

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
            const { idToken, role } = req.body;
            if (!idToken || !role) throw new NotFoundError("idToken is required!");
    
            // Verify the Google token
            const payload = await verifyGoogleToken(idToken);
            if (!payload) throw new BadRequestError("Invalid Google token!");
    
            const { name = "", email, sub: googleId } = payload;
            if (!email || !googleId)  throw new NotFoundError("Google token is missing essential information!");
    
            // Check if the user exists or create a new one
            const user = await this.userService.googleLogin(name, email, googleId, role);
            if (!user) throw new NotFoundError("User not found!");

            if(user.isBlocked) throw new BadRequestError("Your account is blocked. Please contact support for further details")
    
            // Generate tokens
            const tokenPayload = { id: user.id, email: user.email, role: user.role };
            const token = AuthService.generateToken(tokenPayload);  
            const refreshToken = AuthService.generateRefreshToken(tokenPayload);
    
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
                    profileImage: user.profileImage, 
                    isBlocked: user.isBlocked,
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
                res.status(400).json({ message: "Invalid input. Please check your input and try again.", error: errorMessages });
                return;
            }
            
            const { password, token } = value;

            const response = await this.userService.resetPassword(password, token);
            
            return res.status(200).json({ 
                message: "Your password has been updated successfully. You can now log in with your new password.",
                role: response
                });

        } catch (error) {
            next(error);
            return;
        }
    };

    public changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { error, value } = changePasswordValidationSchema.validate(req.body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Invalid input. Please check your input and try again.", error: errorMessages });
                return;
            }

            const { password, email } = value;

            await this.userService.changePassword(password, email);

            return res.status(200).json({ message: "Your password has been changed successfully."});
        } catch (error) {
            next(error);
        }
    }

    public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { error, value } = updateProfileValidationSchema.validate(req.body, { abortEarly: true });

            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Invalid input. Please check your input and try again.", error: errorMessages });
                return;
            }

            const { name, email, country, profileImage } = value;

            const user = await this.userService.updateProfile(name, email, country, profileImage);
            if (!user) throw new NotFoundError("User not found!");

            if(user.isBlocked) throw new NotAuthorizedError();

            return res.status(200).json({ message: "Profile updated successfully!", user });

        } catch (error) {
            next(error);
        }
    }
    
    public fetchAllCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const customers = await this.userService.fetchAllCustomers();
            if(!customers || customers.length === 0) throw new NotFoundError("No customers found.");

            res.status(200).json({ message: "All customers are fetched", data: customers });
        } catch (error) {
            next(error)
        }
    }

    public fetchAllPropertyOwners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const propertyOwners = await this.userService.fetchAllPropertyOwners();
            if(!propertyOwners || propertyOwners.length === 0) throw new NotFoundError("No Property Owners found.");

            res.status(200).json({ message: "All Property Owners are fetched", data: propertyOwners });
        } catch (error) {
            next(error);
        }
    }

    public updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { isBlocked } = req.body;
            const { userId } = req.params;

            if(typeof isBlocked !== "boolean") {
                res.status(400).json({ message: "Invalid status value. Must be boolean." });
                return;
            }

            const updatedUser = await this.userService.updateUserStatus(userId, isBlocked);
            if (!updatedUser) {
                res.status(404).json({ message: "User not found" });
                return;
              }
        
            res.status(200).json({ message: "User status updated successfully", user: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    public fetchUserById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.query;
            if(!userId || typeof userId !== "string") throw new NotFoundError("Resource not found");

            const user = await this.userService.fetchByUserId(userId);
            if(!user) throw new BadRequestError("No user found with this account.");

            res.status(200).json({ message: "User fetched successfully", data: user});
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
