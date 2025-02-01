import { NotFoundError } from "@be-my-guest/common";
import { IRoomsAndSpacesDoc } from "../../models/interface/IRoomsAndSpacesModel";
import { IRoomsAndSpacesRepository } from "../../repositories/interface/IRoomsAndSpacesRepository";
import { IRoomsAndSpacesService } from "../interface/IRoomsAndSpacesService";

export class RoomsAndSpacesService implements IRoomsAndSpacesService {
    private roomsAndSpacesRepository: IRoomsAndSpacesRepository;

    constructor(roomsAndSpacesRepository: IRoomsAndSpacesRepository) {
        this.roomsAndSpacesRepository = roomsAndSpacesRepository;
    }

    async addRoomsAndSpaces(details: IRoomsAndSpacesDoc): Promise<IRoomsAndSpacesDoc> {
        try {
            const response = await this.roomsAndSpacesRepository.saveRoomsAndSpaces(details);
            if(!response) throw new NotFoundError("Failed to save rooms and spces information");
            return response;
        } catch (error) {
            console.error("Error in add basic info service:", error);
            throw error;
        }
    }
}