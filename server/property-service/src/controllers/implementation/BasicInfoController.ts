import { NextFunction, Request, Response } from "express";
import { IBasicInfoService } from "../../services/interface/IBasicInfoService";
import { IBasicInfoController } from "../interface/IBasicInfoController";
import { basicInfoValidationSchema } from "../../validations/BasicInfo";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";

export class BasicInfoController implements IBasicInfoController {
    private basicInfoService: IBasicInfoService;

    constructor(_basicInfoService: IBasicInfoService) {
        this.basicInfoService = _basicInfoService;
    }

    public basicInfo = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = basicInfoValidationSchema.validate(req.body, { abortEarly: false });

            if (error) {
                const errorMessages = error.details.map((detail) => detail.message);
                res.status(400).json({ message: "Validation Error", error: errorMessages });
                return;
            }
            
            const propertyDetails = value;

            if (!value) {
                throw new NotFoundError("Missing Credentials!");
            }
            const basicInfo = await this.basicInfoService.addBasicInfo(propertyDetails);
            if (!basicInfo) {
                throw new BadRequestError("Unable to add the basic information");
            }

            res.status(200).json({ 
                message: "Basic information saved successfully", 
                data: basicInfo 
            });
        } catch (error) {
            next(error);
        }
    }
}