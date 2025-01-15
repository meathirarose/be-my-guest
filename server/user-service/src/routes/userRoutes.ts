import express from "express";
import { UserController } from "../controllers/UserController";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/register', userController.registerUser);
router.post('/verify-email', userController.verifyEmail);
router.post('/signin', userController.signInUser as never);
router.post('/refresh-token', userController.refreshToken as never);
router.post('/google-login', userController.googleLogin as never);
router.post('/forgot-password', userController.forgotPassword as never);
router.post('/reset-password', userController.resetPassword as never);
router.post('/update-profile', userController.updateProfile as never);
router.post('/logout-customer', userController.logoutUser as never);

export default router;