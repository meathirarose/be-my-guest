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

    async fetchPropertiesByUser(userId: string): Promise<IPropertyDoc[] | null> {
        try {
            return await this.findAll({userId});
        } catch (error) {
            console.error("Error fetching all properties:", error);
            throw error;
        }
    }

    async fetchProperties(): Promise<IPropertyDoc[] | null> {
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

    async blockProperty(propertyId: string, isBlocked: boolean): Promise<IPropertyDoc | null> {
        try {
            const updatedStatus = await this.findByIdAndUpdate(propertyId, {isBlocked});
            return updatedStatus;
        } catch (error) {
            console.error("Error updating property:", error);
            throw error;
        }
    }

    async filterProperties(filter: Record<string, unknown>): Promise<IPropertyDoc[] | null> {
        try {
            return await this.findAll(filter); 
        } catch (error) {
            console.error("Error filtering properties:", error);
            throw error;
        }
    }
    
}