import { Request, Response } from "express";
import { IPropertyOwnerController } from "../interfaces/IPropertyOwnerController";
import { PropertyOwnerService } from "../services/PropertyOwnerService";
import { signUpHostValidationSchema } from "../validations/SignUpHostValidation";

export class PropertyOwnerController implements IPropertyOwnerController{
    private propertyOwnerService: PropertyOwnerService;

    constructor() {
        this.propertyOwnerService = new PropertyOwnerService();
    }

    public registerPropertyOwner = async (req: Request, res: Response): Promise<void> => {
        console.log("hello register property owner-----------------------start--------------");
        console.log(req.body,"req body---------------------------------------------------------")
        try {
            const { error, value } = signUpHostValidationSchema.validate(req.body, {abortEarly: false});
            console.log(error, value, "error value----------------------------------------------")
            if(error){
                console.log(error, "error---------------------------------------------")
                const errorMessages = error.details.map(detail => detail.message);
                console.log(errorMessages, "error messages-------------------------")
                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }
    
            const { fullName, email, phoneNumber, country, password } = value;
            console.log(value, "value from host register-------------------------------------------");
    
            const user = await this.propertyOwnerService.registerPropertyOwner(fullName, email, phoneNumber, password, country);
            console.log(user, "hello user from host register controller-----------------------------------");
    
            res.status(201).json({ message: "Property-Owner registered successfully!", data: user });
            
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    }
}