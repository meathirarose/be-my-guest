import express from "express";
import { PropertyController } from "../controllers/implementation/PropertyController";
import { IPropertyRepository } from "../repositories/interface/IPropertyRepository";
import { PropertyRepository } from "../repositories/implementation/PropertyRespository";
import { IPropertyService } from "../services/interface/IPropertyService";
import { PropertyService } from "../services/implementation/PropertyService";
import { IPropertyController } from "../controllers/interface/IPropertyController";
import { requireAuth, validateRequest } from "@be-my-guest/common";
import { propertyValidationSchema } from "../validations/propertyValidation";

const router = express.Router();

const propertyRepository: IPropertyRepository = new PropertyRepository();
const propertyService: IPropertyService = new PropertyService(propertyRepository);
const propertyController: IPropertyController = new PropertyController(propertyService);

router.post(
    "/add-property",
    validateRequest(propertyValidationSchema),
    propertyController.listProperty
);

router.get(
    "/fetch-properties",
    requireAuth,
    propertyController.fetchProperties
);

router.get(
    `/fetch-property/:propertyId`,
    requireAuth,
    propertyController.fetchProperty
);

router.patch(
    `/update-property/:propertyId`,
    requireAuth,
    propertyController.updateProperty
);

router.patch(
    `/block-property/:propertyId`,
    requireAuth,
    propertyController.blockProperty
);

export default router;