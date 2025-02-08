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
            const userId = typeof req.query.userId === 'string' ? req.query.userId : undefined;

            if(!userId) throw new BadRequestError("No user found with the provided data");

            const { error, value } = propertyValidationSchema.validate(req.body, { abortEarly: false });
            
            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Validation Error", error: errorMessages });
                return;
            }

            const { basicInfo, location, roomsAndSpaces, mediaUrls, pricing } = value;
            
            if(!basicInfo || !location || !roomsAndSpaces || !mediaUrls || !pricing || !userId)
                throw new NotFoundError("Missing Input Credentials");

            const propertyDetails = await this.propertyService.listProperty(basicInfo, location, roomsAndSpaces, mediaUrls, pricing, userId);
            
            if(!propertyDetails) throw new BadRequestError("Unable to add Property Details");

            res.status(200).json({ message: "Property published successfully", data: propertyDetails});
        } catch (error) {
            next(error);
        }
    };

    public fetchProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const properties = await this.propertyService.fetchProperties();

            if(!properties || properties.length === 0) throw new NotFoundError("No properties found!");

            res.status(200).json({ message: "All properties fetched successfully" , data: properties});

        } catch (error) {
            next(error);
        }
    }

    public fetchProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { propertyId } = req.params;

            if(!propertyId) throw new NotFoundError("No property with the given data found");
        
            const property = await this.propertyService.fetchProperty(propertyId);
            
            if (!property) throw new NotFoundError("No property found");
            
            res.status(200).json({ message: "Property fetched successfully", data: property });
        } catch (error) {
            next(error);
        }
    }
    
    public updateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { propertyId } = req.params;

            if(!propertyId) throw new NotFoundError("No property with the given data found");

            const updatedData = req.body; 

            if(!updatedData) throw new NotFoundError("Property data is not available");
    
            const updatedProperty = await this.propertyService.updateProperty(propertyId, updatedData);
    
            if (!updatedProperty) throw new NotFoundError("No property found");
    
            res.status(200).json({ message: "Property updated successfully", data: updatedProperty });
        } catch (error) {
            next(error);
        }
    }
    
}