import { NextFunction, Request, Response } from "express";
import { ILocationDetailsService } from "../../services/interface/ILocationDetailsService";
import { ILocationDetailsController } from "../interface/ILocationDetailsController";
import { locationDetailsValidationSchema } from "../../validations/locationDetails";
import { NotFoundError } from "@be-my-guest/common";

export class LocationDetailsController implements ILocationDetailsController {
    private locationDetailsService: ILocationDetailsService;

    constructor(locationDetailsService: ILocationDetailsService) {
        this.locationDetailsService = locationDetailsService;
    }

    public async addLocationDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { error, value } = locationDetailsValidationSchema.validate(req.body, { abortEarly: false });

            if(error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Validation Error", error: errorMessages });
                return;
            }
            const propertyDetails = value;
            console.log(propertyDetails, "<--------------------------ingane thanne aano varane location details");

            if(!value)
                throw new NotFoundError("Missing Credentials!");

            res.status(200).json({ message: "Location details saved successfully", data: propertyDetails });
        } catch (error) {
            next(error);
        }
    }
}