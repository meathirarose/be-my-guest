import { Request, Response, NextFunction } from "express";
import { IPropertyController } from "../interface/IPropertyController";
import { propertyValidationSchema } from "../../validations/propertyValidation";
import { BadRequestError, HttpStatusCode, Messages, NotFoundError, responseHandler } from "@be-my-guest/common";
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
                responseHandler(res, HttpStatusCode.BAD_REQUEST, Messages.VALIDATION_ERROR, {error: errorMessages})
            }

            const { basicInfo, location, roomsAndSpaces, mediaUrls, pricing } = value;

            const propertyDetails = await this.propertyService.listProperty(
                basicInfo, 
                location, 
                roomsAndSpaces, 
                mediaUrls, 
                pricing, 
                userId
            );
            if(!propertyDetails) throw new BadRequestError("Unable to add Property Details");

            responseHandler(res, HttpStatusCode.OK, Messages.CREATED, { data: propertyDetails })
        } catch (error) {
            next(error);
        }
    };

    public fetchPropertiesByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.query;
            if(!userId || typeof userId !== "string") throw new NotFoundError("Resource not found");

            const properties = await this.propertyService.fetchPropertiesByUser(userId);
            if(!properties || properties.length === 0) throw new NotFoundError("No properties found!");
            
            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: properties })
        } catch (error) {
            next(error);
        }
    }

    public fetchProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const properties = await this.propertyService.fetchProperties();
            if(!properties || properties.length === 0) throw new NotFoundError("No properties found!");

            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: properties })
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
            
            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: property })
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
    
            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: updatedProperty })
        } catch (error) {
            next(error);
        }
    }

    public blockProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { isBlocked } = req.body;
            const { propertyId } = req.params;
           
            if (!propertyId) throw new NotFoundError('Property ID is required');

            const updatedStatus = await this.propertyService.blockProperty(propertyId, isBlocked);
            if(!updatedStatus) throw new BadRequestError("Unable to update Property Details");

            responseHandler(res, HttpStatusCode.OK, Messages.FETCHED, { data: updatedStatus })
        } catch (error) {
            next(error);
        }
    }

    public addToWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body;
            console.log(data, "what is in the req body do you want to know?-------------------------------");
            responseHandler(res, HttpStatusCode.OK, Messages.CREATED, { data: data });
        } catch (error) {
            next(error);
        }
    }
    
}