import express from "express";
import { PropertyController } from "../controllers/implementation/PropertyController";
import { IPropertyRepository } from "../repositories/interface/IPropertyRepository";
import { PropertyRepository } from "../repositories/implementation/PropertyRespository";
import { IPropertyService } from "../services/interface/IPropertyService";
import { PropertyService } from "../services/implementation/PropertyService";
import { IPropertyController } from "../controllers/interface/IPropertyController";

const router = express.Router();

const propertyRepository: IPropertyRepository = new PropertyRepository();
const propertyService: IPropertyService = new PropertyService(propertyRepository);
const propertyController: IPropertyController = new PropertyController(propertyService);

router.post(
    "/list-property",
    propertyController.listProperty
);

router.get(
    "/fetch-properties",
    propertyController.fetchProperties
)

export default router;