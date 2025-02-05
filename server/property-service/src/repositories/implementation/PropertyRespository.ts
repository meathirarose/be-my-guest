import { IPropertyDoc } from "../../models/interface/IPropertyModel";
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { BaseRepository } from "./BaseRepository";
import { Property } from "../../models/implementation/PropertyModel";

export class PropertyRepository extends BaseRepository<IPropertyDoc> implements IPropertyRepository {
    constructor() {
        super(Property)
    }

    async savePropertyDetails(
        basicInfo: IPropertyDoc["basicInfo"],
        location: IPropertyDoc["location"],
        roomsAndSpaces: IPropertyDoc["roomsAndSpaces"],
        mediaUrls: IPropertyDoc["mediaUrls"],
        pricing: IPropertyDoc["pricing"]
      ): Promise<IPropertyDoc> {
        const propertyData: Partial<IPropertyDoc> = {
          basicInfo,
          location,
          roomsAndSpaces,
          mediaUrls,
          pricing,
        };    

        return await this.create(propertyData);
    }

    async fetchAllProperties(): Promise<IPropertyDoc[] | null> {
        return await this.findAllProperties();
    }

}