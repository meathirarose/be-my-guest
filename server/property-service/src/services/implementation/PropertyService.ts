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
        return response;
    } catch (error) {
        console.error("Error in adding property details:", error);
        throw error;
    }
  }

  async fetchProperties(): Promise<IPropertyDoc[] | null> {
      try {
        const response = await this.propertyRepository.fetchAllProperties();
        return response;
      } catch (error) {
        console.error("Error in fetching property details:", error);
        throw error;
      }
  }

  async fetchProperty(propertyId: string): Promise<IPropertyDoc | null> {
      try {
        const response = await this.propertyRepository.fetchProperty(propertyId);
        return response;
      } catch (error) {
        console.error("Error in fetching property details:", error);
        throw error;
      }
  }

  async updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null> {
    try {
        const updatedProperty = await this.propertyRepository.updateProperty(propertyId, updatedData);
        return updatedProperty;
    } catch (error) {
        console.error("Error in updating property:", error);
        throw error;
    }
  }
}
