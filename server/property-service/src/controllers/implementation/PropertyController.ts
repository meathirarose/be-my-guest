import { Request, Response, NextFunction } from "express";
import { IPropertyController } from "../interface/IPropertyController";
import { propertyValidationSchema } from "../../validations/propertyValidation";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { IPropertyService } from "../../services/interface/IPropertyService";

export class PropertyController implements IPropertyController {
    private propertyService: IPropertyService;

    constructor(propertyService: IPropertyService) {
        this.propertyService = propertyService;
    }
    public listProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = propertyValidationSchema.validate(req.body, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Validation Error", error: errorMessages });
                return;
            }

            const { basicInfo, location, roomsAndSpaces, mediaUrls, pricing } = value;
            
            if(!basicInfo || !location || !roomsAndSpaces || !mediaUrls || !pricing)
                throw new NotFoundError("Missing Credentials");

            const propertyDetails = await this.propertyService.listProperty(basicInfo, location, roomsAndSpaces, mediaUrls, pricing);
            console.log("getting property details from service==================================>", propertyDetails);
            
            if(!propertyDetails) throw new BadRequestError("Unable to add Property Details");

            res.status(200).json({ message: "Received data successfully", data: propertyDetails});
        } catch (error) {
            next(error);
        }
    };

    public fetchProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            
            const properties = await this.propertyService.fetchProperties();

            if(!properties || properties.length === 0) throw new NotFoundError("No properties found!");

            res.status(200).json({ message: "All properties fetched" , data: properties});

        } catch (error) {
            next(error);
        }
    }
}