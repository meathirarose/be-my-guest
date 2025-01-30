import { Request, Response, NextFunction } from "express";
import { basicInfoValidationSchema } from "../../validations/BasicInfo";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { IPropertyController } from "../interface/IPropertyController";
import { IPropertyService } from "../../services/interface/IPropertyService";

export class PropertyController implements IPropertyController {
    private propertyService: IPropertyService;

    constructor(propertyService: IPropertyService) {
        this.propertyService = propertyService;
    }

    public async basicInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { error, value } = basicInfoValidationSchema.validate(req.body, { abortEarly: true });

            if (error) {
              const errorMessages = error.details.map((detail) => detail.message);
              res.status(400).json({ message: "Validation Error", error: errorMessages });
              return;
            }
            
            const propertyDetails = value;
            console.log("from the property controller--------------propertyDetails-------------->",propertyDetails)
            if(!value)
                throw new NotFoundError("Missing Credentials!");

            const basicInfo = await this.propertyService.addBasicInfo(propertyDetails);
            console.log("from the property controller--------------basicInfo------------>",basicInfo)

            if(!basicInfo)
                throw new BadRequestError("Unable to add the basic information");

            // Send response back to frontend
            res.status(200).json({ message: "Data received", data: basicInfo });
        } catch (error) {
            next(error);
        }
    }
}

