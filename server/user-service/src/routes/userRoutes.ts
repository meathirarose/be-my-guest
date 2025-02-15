import express, { RequestHandler } from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { IUserController } from "../interfaces/IUserController";
import { requireAuth, validateRequest } from "@be-my-guest/common";
import { signUpValidationSchema } from "../validations/SignUpValidation";
import { signInValidationSchema } from "../validations/SignInValidation";
import { updateProfileValidationSchema } from "../validations/UpdateProfileValidation";
import { resetPasswordValidationSchema } from "../validations/ResetPasswordValidation";
import { changePasswordValidationSchema } from "../validations/ChangePasswordValidation";


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
  validateRequest(resetPasswordValidationSchema),
  userController.resetPassword as RequestHandler
);

router.post(
  "/change-password",
  requireAuth,
  validateRequest(changePasswordValidationSchema),
  userController.changePassword as RequestHandler
);

router.patch(
  "/update-profile",
  requireAuth,
  validateRequest(updateProfileValidationSchema),
  userController.updateProfile as RequestHandler
);

router.get(
  "/fetch-customers",
  requireAuth,
  userController.fetchAllCustomers as RequestHandler
);

router.get(
  "/fetch-property-owners",
  requireAuth,
  userController.fetchAllPropertyOwners as RequestHandler
)

router.patch(
  "/:userId/update-status",
  requireAuth,
  userController.updateUserStatus as RequestHandler
);

router.post(
  "/logout-customer",
  requireAuth,
  userController.logoutUser as RequestHandler
);

export default router;
