import express from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IUserService } from "../interfaces/IUserService";
import { IUserController } from "../interfaces/IUserController";

const router = express.Router();
const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController: IUserController = new UserController(userService);

router.post('/update-profile', userController.updateProfile);
router.post('/register', userController.registerUser);
router.post('/verify-email',  userController.verifyEmail);
router.post('/signin', userController.signInUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/google-login', userController.googleLogin);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
router.post('/logout-customer', userController.logoutUser);

export default router;