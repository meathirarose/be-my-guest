import { BadRequestError } from "@be-my-guest/common";
import { IPropertyDoc } from "../../models/interface/IPropertyModel";
import { IPropertyRepository } from "../../repositories/interface/IPropertyRepository";
import { IPropertyService } from "../interface/IPropertyService";

export class PropertyService implements IPropertyService {
  private propertyRepository: IPropertyRepository;

  constructor(propertyRepository: IPropertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async listProperty(
    basicInfo: IPropertyDoc["basicInfo"],
    location: IPropertyDoc["location"],
    roomsAndSpaces: IPropertyDoc["roomsAndSpaces"],
    mediaUrls: IPropertyDoc["mediaUrls"],
    pricing: IPropertyDoc["pricing"],
    userId?: string
  ): Promise<IPropertyDoc | null> {
    try {
        const response = await this.propertyRepository.savePropertyDetails(basicInfo, location, roomsAndSpaces, mediaUrls, pricing, userId);
        if (!response) throw new BadRequestError("Failed to save property details. Please check the provided information and try again.");
        return response;
    } catch (error) {
        console.error("Error in adding property details:", error);
        throw error;
    }
  }

  async fetchProperties(): Promise<IPropertyDoc[] | null> {
      try {
        const response = await this.propertyRepository.fetchAllProperties();
        if(!response || response.length === 0) throw new BadRequestError("No properties found.")
        return response;
      } catch (error) {
        console.error("Error in fetching property details:", error);
        throw error;
      }
  }

  async fetchProperty(propertyId: string): Promise<IPropertyDoc | null> {
      try {
        const response = await this.propertyRepository.fetchProperty(propertyId);
        if(!response) throw new BadRequestError("No property found.");
        return response;
      } catch (error) {
        console.error("Error in fetching property details:", error);
        throw error;
      }
  }

  async updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null> {
    try {
        const updatedProperty = await this.propertyRepository.updateProperty(propertyId, updatedData);
        if(!updatedProperty) throw new BadRequestError("Failed to update property details. Please check the provided information and try again.")
        return updatedProperty;
    } catch (error) {
        console.error("Error in updating property:", error);
        throw error;
    }
  }
}
