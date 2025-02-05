import express, { RequestHandler } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { IUserController } from "../interfaces/IUserController";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { currentUser, requireAuth, validateRequest } from "@be-my-guest/common";


const router = express.Router();
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController: IUserController = new UserController(userService);


router.post(
  "/register",
  validateRequest(signUpValidationSchema),
  userController.registerUser
);

router.post(
  "/verify-email",
  currentUser,
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
  userController.refreshToken as RequestHandler
);

router.post(
  "/google-login", 
  userController.googleLogin as RequestHandler
);

router.post(
  "/forgot-password", 
  userController.forgotPassword
);

router.post(
  "/reset-password",
  userController.resetPassword as RequestHandler
);

router.patch(
  "/update-profile",
  currentUser,
  requireAuth,
  userController.updateProfile as RequestHandler
);

router.get(
  "/fetch-customers",
  currentUser,
  requireAuth,
  userController.fetchAllCustomers as RequestHandler
)

router.patch(
  "/:userId/update-status",
  currentUser, 
  requireAuth,
  userController.updateUserStatus as RequestHandler
)

router.post(
  "/logout-customer",
  currentUser,   
  userController.logoutUser as RequestHandler
);

export default router;
