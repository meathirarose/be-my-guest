import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { userValidationSchema } from "../validations/UserValidation";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const { error, value } = userValidationSchema.validate(req.body, { abortEarly: false });
            console.log(error,  "errorrrrrrrrrrrrrrrrrrrrrrrrrr--------------");

            if(error){
                const errorMessages = error.details.map(detail => detail.message);

                res.status(400).json({ message: 'Validation error', error: errorMessages});
                return;
            }

            const { name, email, password, country } = value;

            const user = await this.userService.registerUser(name, email, password, country);
            
            res.status(201).json({ message: "User created successfully!", data: user });

        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    };

    public verifyEmail = async (req: Request, res: Response) => {
        try {
            console.log("verify email controller-----------------------------------------------")
            const { token } = req.query;
            console.log(token);

            await this.userService.verifyEmail(token as string);
            res.status(200).json({ status: "success", message: "Email successfully verified." });

        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    };
}
