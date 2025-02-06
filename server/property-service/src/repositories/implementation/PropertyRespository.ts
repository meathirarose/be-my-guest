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
        pricing: IPropertyDoc["pricing"],
        userId?: string
      ): Promise<IPropertyDoc> {
        const propertyData: Partial<IPropertyDoc> = {
          basicInfo,
          location,
          roomsAndSpaces,
          mediaUrls,
          pricing,
          userId
        };    

        return await this.create(propertyData);
    }

    async fetchAllProperties(): Promise<IPropertyDoc[] | null> {
        return await this.findAll();
    }

    async fetchProperty(propertyId: string): Promise<IPropertyDoc | null> {
        console.log(propertyId, "property id from repo")
        return await this.findById(propertyId);
    }
    async updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null> {
        try {
            // Pass the propertyId as the filter and the updatedData as the item
            const updatedProperty = await this.update({ _id: propertyId }, updatedData);
            return updatedProperty;
        } catch (error) {
            console.error("Error updating property:", error);
            throw error;
        }
    }


}