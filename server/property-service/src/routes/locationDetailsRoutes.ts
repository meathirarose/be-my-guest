import express from "express";
import { LocationDetailsRepository } from "../repositories/implementation/LocationDetailsRepostitory";
import { ILocationDetailsRepository } from "../repositories/interface/ILocationDetailsRepository";
import { LocationDetailsService } from "../services/implementation/LocationDetailsService";
import { ILocationDetailsService } from "../services/interface/ILocationDetailsService";
import { ILocationDetailsController } from "../controllers/interface/ILocationDetailsController";
import { locationDetailsValidationSchema } from "../validations/locationDetails";
import { validateRequest } from "@be-my-guest/common";
import { LocationDetails } from "../models/implementation/LocalDetailsModel";
import { LocationDetailsController } from "../controllers/implementation/LocationDetailsController";

const router = express.Router();

const locationDetailsRepository: ILocationDetailsRepository = new LocationDetailsRepository(LocationDetails);
const locationDetailsService: ILocationDetailsService = new LocationDetailsService(locationDetailsRepository);
const locationDetailsController: ILocationDetailsController = new LocationDetailsController(locationDetailsService);

router.post(
    "/add-location-details",
    validateRequest(locationDetailsValidationSchema),
    locationDetailsController.addLocationDetails
);

export default router;