import { NextFunction, Request, Response } from "express";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { BadRequestError, HttpStatusCode, Messages, NotAuthorizedError, NotFoundError, responseHandler } from "@be-my-guest/common";
import { IUserController } from "../interfaces/IUserController";
import { resetPasswordValidationSchema } from "../validations/ResetPasswordValidation";
import { IUserService } from "../interfaces/IUserService";
import { changePasswordValidationSchema } from "../validations/ChangePasswordValidation";
import { updateProfileValidationSchema } from "../validations/UpdateProfileValidation";

export class UserController implements IUserController{
    private userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    // sign up user - customer/property-owner/admin
    public registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = signUpValidationSchema.validate(req.body, { abortEarly: false });
            if(error){
                const errorMessages = error.details.map(detail => detail.message);
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, {error: errorMessages})
            }

            const { name, email, password, country, role } = value;

            const user = await this.userService.registerUser(name, email, password, country, role);
            if(!user) throw new BadRequestError("Unable to create a user account");

            responseHandler(res, HttpStatusCode.CREATED, Messages.CREATED, { data: user });
        } catch (error) {
            next(error)
        }
    };

    // verfy the email 
    public verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { token } = req.query;
                
            const user = await this.userService.verifyEmail(token as string);
            if(!user) throw new BadRequestError("Unable to verify email");

            responseHandler(res, HttpStatusCode.OK, Messages.SUCCESS, user);
        } catch (error) {
            next(error);
        }
    };
    
    // sign in user
    public signInUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = signInValidationSchema.validate(req.body, { abortEarly: false });
            if(error) {
                const errorMessages = error.details.map(detail => detail.message);
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, { error: errorMessages })
            }

            const { email, password } = value;

            const { user, token, refreshToken } = await this.userService.signInUser(email, password);

            res.cookie('accessToken', token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000 }); //1 hour
            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days
  
            responseHandler(res, HttpStatusCode.OK, Messages.SUCCESS, { 
                user: {
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    country: user.country, 
                    role: user.role, 
                    profileImage: user.profileImage,
                    isBlocked: user.isBlocked,
                },
                token: token, 
            })

        } catch (error) {
            next(error)
        }
    }

    // refresh token for creating new access token
    public refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) throw new NotFoundError("Refresh token is missing!");

            const newAccessToken = await this.userService.refreshToken(refreshToken);

            res.cookie('accessToken', newAccessToken, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000,}); // 1 hour

            responseHandler(res, HttpStatusCode.OK, Messages.UPDATED, {accessToken: newAccessToken})
        } catch (error) {
            next(error);
        }
    }

    // google login
    public googleLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { idToken, role } = req.body;
            if (!idToken || !role) throw new NotFoundError("idToken is required!");

            const { user, token, refreshToken } = await this.userService.googleLogin( idToken, role );
            if (!user || !token || !refreshToken) throw new NotFoundError("Credentials not found!");
    
            // Set cookies
            res.cookie("accessToken", token, { httpOnly: true, sameSite: "strict", maxAge: 60 * 60 * 1000, }); // 1 hour
            res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000,});// 7 days
    
            responseHandler(res, HttpStatusCode.OK, Messages.SUCCESS, {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    country: user.country,
                    role: user.role,
                    profileImage: user.profileImage, 
                    isBlocked: user.isBlocked,
                },
                token: token,
            });
        } catch (error) {
            next(error);  
        }
    };
    
    // forgot password
    public forgotPassword = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
        try {
            const { email } = req.body;

            await this.userService.forgotPassword(email);

            responseHandler(res, HttpStatusCode.OK, Messages.PASSWORD_RESET_SENT)
        } catch (error) {
            next(error);
        }
    }

    // resetting password
    public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { error, value } = resetPasswordValidationSchema.validate(req.body, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, { error: errorMessages })
            }
            
            const { password, token } = value;

            const response = await this.userService.resetPassword(password, token);
            
            responseHandler( res, HttpStatusCode.OK, Messages.PASSWORD_CHANGED, { role: response });
        } catch (error) {
            next(error);
        }
    };

    // change the existing password
    public changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { error, value } = changePasswordValidationSchema.validate(req.body, { abortEarly: false });
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, { error: errorMessages })
            }

            const { password, email } = value;

            await this.userService.changePassword(password, email);

            responseHandler(res, HttpStatusCode.OK, Messages.PASSWORD_CHANGED);
        } catch (error) {
            next(error);
        }
    }

    // updating profile information
    public updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {

            const { error, value } = updateProfileValidationSchema.validate(req.body, { abortEarly: true });

            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, { error: errorMessages })
            }

            const { name, email, country, profileImage } = value;

            const user = await this.userService.updateProfile(name, email, country, profileImage);
            if (!user) throw new NotFoundError("User not found!");

            if(user.isBlocked) throw new NotAuthorizedError();

            responseHandler(res, HttpStatusCode.OK, Messages.UPDATED, user);
        } catch (error) {
            next(error);
        }
    }
    
    // fetch all customers by admin
    public fetchAllCustomers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const customers = await this.userService.fetchAllCustomers();
            if(!customers || customers.length === 0) throw new NotFoundError("No customers found.");

            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: customers })
        } catch (error) {
            next(error)
        }
    }

    // fetch all property-owners by admin
    public fetchAllPropertyOwners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const propertyOwners = await this.userService.fetchAllPropertyOwners();
            if(!propertyOwners || propertyOwners.length === 0) throw new NotFoundError("No Property Owners found.");

            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: propertyOwners })
        } catch (error) {
            next(error);
        }
    }

    // updating the user status - block/unblock - admin
    public updateUserStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { isBlocked } = req.body;
            const { userId } = req.params;

            if(typeof isBlocked !== "boolean") responseHandler(res, HttpStatusCode.UNAUTHORIZED, Messages.INVALID_VALUE)

            const updatedUser = await this.userService.updateUserStatus(userId, isBlocked);
            if (!updatedUser) responseHandler(res, HttpStatusCode.NOT_FOUND, Messages.NOT_FOUND);
        
            responseHandler(res, HttpStatusCode.OK, Messages.UPDATED, { user: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    // fetch user by their ID
    public fetchUserById = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.query;
            if(!userId || typeof userId !== "string") throw new NotFoundError("Resource not found");

            const user = await this.userService.fetchByUserId(userId);
            if(!user) throw new BadRequestError("No user found with this account.");

            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: user });
        } catch (error) {
            next(error);
        }
    }
    
    // logout of user
    public logoutUser = async(req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('accessToken',{ httpOnly: true, sameSite: "strict",});

            responseHandler(res, HttpStatusCode.OK, Messages.SUCCESS)
        } catch (error) {
            next(error);
        }
    }

}
