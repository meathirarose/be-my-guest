import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password } = req.body;

            const user = await this.userService.registerUser(name, email, password);
            
            res.status(201).json({ message: "User created successfully!", data: user });
        } catch (error) {
            console.error("Error:", error);
            res.status(400).json({ message: error});
        }
    }
}
