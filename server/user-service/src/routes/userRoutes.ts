import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.registerUser);
router.post("/verify-email", userController.verifyEmail);

export default router;
