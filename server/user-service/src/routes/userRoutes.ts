import express from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { IUserController } from "../interfaces/IUserController";
import { validateRequest } from "../middlewares/validateRequest";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { currentUser } from "../middlewares/currentUser";
import { requireAuth } from "../middlewares/requireAuth";


const router = express.Router();
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController: IUserController = new UserController(userService);

router.patch(
  "/update-profile",
  currentUser,
  requireAuth,
  userController.updateProfile
);

router.post(
  "/register",
  validateRequest(signUpValidationSchema),
  userController.registerUser
);

router.post(
  "/verify-email",
  currentUser,
  requireAuth,
  userController.verifyEmail
);

router.post(
  "/signin",
  validateRequest(signInValidationSchema),
  userController.signInUser
);

router.post(
    "/refresh-token",
    currentUser, 
    userController.refreshToken
);

router.post(
    "/google-login", 
    userController.googleLogin
);

router.post(
    "/forgot-password", 
    userController.forgotPassword
);

router.post(
  "/reset-password",
  userController.resetPassword
);
router.post(
  "/logout-customer",
  currentUser,   
  userController.logoutUser
);

export default router;
