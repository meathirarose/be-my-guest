import { NotFoundError } from "@be-my-guest/common";
import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";
import { ILocationDetailsRepository } from "../../repositories/interface/ILocationDetailsRepository";
import { ILocationDetailsService } from "../interface/ILocationDetailsService";


export class LocationDetailsService implements ILocationDetailsService {
    private locationDetailsRepository: ILocationDetailsRepository;

    constructor(locationDetailsRepository: ILocationDetailsRepository) {
        this.locationDetailsRepository = locationDetailsRepository;
    }

    async addLocationDetails(details: ILocationDetailsDoc): Promise<ILocationDetailsDoc | null> {
        try {
            const response =  await this.locationDetailsRepository.saveLocationDetails(details);
            if (!response) throw new NotFoundError("Failed to save basic info");
            return response;
        } catch (error) {
            console.error("Error in add basic info service:", error);
            throw error;
        }
    }

}
