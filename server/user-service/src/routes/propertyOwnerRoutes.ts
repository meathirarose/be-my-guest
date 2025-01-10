import express from "express";
import { PropertyOwnerController } from "../controllers/PropertyOwnerController";
import { PropertyOwnerService } from "../services/PropertyOwnerService";
import { UserRepository } from "../repositories/UserRepository";

const router = express.Router();
const userRepository = new UserRepository();
const propertyOwnerService = new PropertyOwnerService(userRepository);
const propertyOwnerController = new PropertyOwnerController(propertyOwnerService);

router.post("/register-host", propertyOwnerController.registerPropertyOwner);
router.post("/signin-host", propertyOwnerController.signInPropertyOwner);

export default router;