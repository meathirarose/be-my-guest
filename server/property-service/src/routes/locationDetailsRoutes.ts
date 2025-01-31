import express from "express";
import { LocationDetailsRepository } from "../repositories/implementation/LocationDetailsRepostitory";
import { ILocationDetailsRepository } from "../repositories/interface/ILocationDetailsRepository";
import { LocationDetailsService } from "../services/implementation/LocationDetailsService";
import { ILocationDetailsService } from "../services/interface/ILocationDetailsService";
import { ILocationDetailsController } from "../controllers/interface/ILocationDetailsController";
import { LocationDetailsController } from "../controllers/implementation/locationDetailsController";
import { LocalDetails } from "../models/implementation/LocalDetailsModel";
import { locationDetailsValidationSchema } from "../validations/locationDetails";
import { validateRequest } from "@be-my-guest/common";

const router = express.Router();

const locationDetailsRepository: ILocationDetailsRepository = new LocationDetailsRepository(LocalDetails);
const locationDetailsService: ILocationDetailsService = new LocationDetailsService(locationDetailsRepository);
const locationDetailsController: ILocationDetailsController = new LocationDetailsController(locationDetailsService);


router.post(
    "/add-location-details",
    validateRequest(locationDetailsValidationSchema),
    locationDetailsController.addLocationDetails
);

export default router;