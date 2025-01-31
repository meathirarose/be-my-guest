import { NextFunction, Request, Response } from "express";
import { ILocationDetailsService } from "../../services/interface/ILocationDetailsService";
import { ILocationDetailsController } from "../interface/ILocationDetailsController";
import { locationDetailsValidationSchema } from "../../validations/locationDetails";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";

export class LocationDetailsController implements ILocationDetailsController {
    private locationDetailsService: ILocationDetailsService;

    constructor(locationDetailsService: ILocationDetailsService) {
        this.locationDetailsService = locationDetailsService;
    }

    public addLocationDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const { error, value } = locationDetailsValidationSchema.validate(req.body, { abortEarly: false });

            if(error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Validation Error", error: errorMessages });
                return;
            }
            const propertyDetails = value;

            if(!value)
                throw new NotFoundError("Missing Credentials!");

            const locationDetails = await this.locationDetailsService.addLocationDetails(propertyDetails);
            if (!locationDetails) {
                throw new BadRequestError("Unable to add the basic information");
            }

            res.status(200).json({ message: "Location details saved successfully", data: propertyDetails });
        } catch (error) {
            next(error);
        }
    }
}