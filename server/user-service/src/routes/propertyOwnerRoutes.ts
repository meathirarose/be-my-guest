import express from "express";
import { PropertyOwnerController } from "../controllers/PropertyOwnerController";

const router = express.Router();
const propertyOwnerController = new PropertyOwnerController();

router.post("/register-host", propertyOwnerController.registerPropertyOwner);
router.post("/signin-host", propertyOwnerController.signInPropertyOwner);

export default router;