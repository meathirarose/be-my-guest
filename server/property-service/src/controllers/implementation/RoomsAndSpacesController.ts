import { Request, Response, NextFunction } from "express";
import { IRoomsAndSpacesService } from "../../services/interface/IRoomsAndSpacesService";
import { IRoomsAndSpacesController } from "../interface/IRoomsAndSpacesController";
import roomsAndSpacesSchema from "../../validations/RoomsAndSpaces";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";

export class RoomsAndSpacesController implements IRoomsAndSpacesController {
  private roomsAndSpacesService: IRoomsAndSpacesService;

  constructor(roomsAndSpacesService: IRoomsAndSpacesService) {
    this.roomsAndSpacesService = roomsAndSpacesService;
  }

  public addRoomsAndSpaces = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const { error, value } = roomsAndSpacesSchema.validate(req.body, { abortEarly: false });

      if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        res.status(400).json({ message: "Validation Error", error: errorMessages });
        return;
      }
      const propertyDetails = value; 
      
      if (!value) {
        throw new NotFoundError("Missing Credentials!")
      }
      const roomDetails = await this.roomsAndSpacesService.addRoomsAndSpaces(propertyDetails);
      if(!roomDetails) {
        throw new BadRequestError("Unable to add rooms and spaces information");
      }

      res.status(201).json({ message: "Details of the room saved successfully", data: roomDetails});
    } catch (error) {
      next(error);
    }
  }
}
