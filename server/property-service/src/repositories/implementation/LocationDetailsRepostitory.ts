import { Model } from "mongoose";
import { BaseRepository } from "../implementation/BaseRepository";
import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";
import { ILocationDetailsRepository } from "../interface/ILocationDetailsRepository";

export class LocationDetailsRepository extends BaseRepository<ILocationDetailsDoc> implements ILocationDetailsRepository {
    private locationDetailsModel: Model<ILocationDetailsDoc>;

    constructor(locationDetailsModel: Model<ILocationDetailsDoc>) {
        super(locationDetailsModel);
        this.locationDetailsModel = locationDetailsModel;
    }

    async saveLocationDetails(data: ILocationDetailsDoc): Promise<ILocationDetailsDoc> {
        return await this.save(data);
    }

    async findByPropertyId(propertyId: string): Promise<ILocationDetailsDoc | null> {
        return await this.locationDetailsModel.findOne({ propertyId });
    }
}
