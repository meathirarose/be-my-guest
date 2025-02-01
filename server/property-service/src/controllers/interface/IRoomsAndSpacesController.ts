import { NextFunction, Request, Response } from "express";

export interface IRoomsAndSpacesController {
    addRoomsAndSpaces(req: Request, res: Response, next: NextFunction): Promise<void>;
}