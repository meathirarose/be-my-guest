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
        try {
            const propertyData: Partial<IPropertyDoc> = { basicInfo, location, roomsAndSpaces, mediaUrls, pricing, userId };    
            return await this.create(propertyData);
        } catch (error) {
            console.error("Error saving property:", error);
            throw error;
        }
    }

    async fetchAllProperties(): Promise<IPropertyDoc[] | null> {
        try {
            return await this.findAll();
        } catch (error) {
            console.error("Error fetching all properties:", error);
            throw error;
        }
    }

    async fetchProperty(propertyId: string): Promise<IPropertyDoc | null> {
        try {
            return await this.findById(propertyId);
        } catch (error) {
            console.error("Error fetching property:", error);
            throw error;
        }
    }
    
    async updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null> {
        try {
            const updatedProperty = await this.update({ _id: propertyId }, updatedData);
            return updatedProperty;
        } catch (error) {
            console.error("Error updating property:", error);
            throw error;
        }
    }


}