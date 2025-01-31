import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";
import { ILocationDetailsRepository } from "../../repositories/interface/ILocationDetailsRepository";
import { ILocationDetailsService } from "../interface/ILocationDetailsService";


export class LocationDetailsService implements ILocationDetailsService {
    private locationDetailsRepository: ILocationDetailsRepository;

    constructor(locationDetailsRepository: ILocationDetailsRepository) {
        this.locationDetailsRepository = locationDetailsRepository;
    }

    async addLocationDetails(details: ILocationDetailsDoc): Promise<ILocationDetailsDoc> {
        return await this.locationDetailsRepository.save(details);
    }

}
