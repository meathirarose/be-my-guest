import express from "express";
import { PropertyController } from "../controllers/implementation/PropertyController";
import { IPropertyRepository } from "../repositories/interface/IPropertyRepository";
import { PropertyRepository } from "../repositories/implementation/PropertyRepository";
import { IPropertyService } from "../services/interface/IPropertyService";
import { PropertyService } from "../services/implementation/PropertyService";
import { IPropertyController } from "../controllers/interface/IPropertyController";

const router = express.Router();

const propertyRepository: IPropertyRepository = new PropertyRepository();
const propertyService: IPropertyService = new PropertyService(propertyRepository);
const propertyController: IPropertyController = new PropertyController(propertyService);

router.post("/list-property-basic-info", (req, res, next) => propertyController.basicInfo(req, res, next));

export default router;
