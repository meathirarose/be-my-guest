import { BadRequestError, NotAuthorizedError, NotFoundError } from "@be-my-guest/common";
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
        const response = await this.propertyRepository.savePropertyDetails(
          basicInfo, 
          location, 
          roomsAndSpaces, 
          mediaUrls, 
          pricing, 
          userId
        );
        if (!response) throw new BadRequestError("Failed to save property details. Please check the provided information and try again.");
        return response;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
      throw new Error("An unexpected error occurred during adding property.");
    }
  }

  async fetchPropertiesByUser(userId: string): Promise<IPropertyDoc[] | null> {
      try {
          const response = await this.propertyRepository.fetchPropertiesByUser(userId);
          if(!response || response.length === 0) throw new BadRequestError("No properties found.");

          return response;
      } catch (error) {
          if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
          throw new Error("An unexpected error occurred during fetching property details.");
      }
  }

  async fetchProperties(): Promise<IPropertyDoc[] | null> {
      try {
          const response = await this.propertyRepository.fetchProperties();
          if(!response || response.length === 0) throw new BadRequestError("No properties found.");
          
          return response;
      } catch (error) {
          if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
          throw new Error("An unexpected error occurred during fetching properties.");
      }
  }

  async fetchProperty(propertyId: string): Promise<IPropertyDoc | null> {
      try {
          const response = await this.propertyRepository.fetchProperty(propertyId);
          if(!response) throw new BadRequestError("No property found.");
          return response;
      } catch (error) {
          if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
          throw new Error("An unexpected error occurred during fetching property.");
      }
  }

  async updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null> {
    try {
        const updatedProperty = await this.propertyRepository.updateProperty(propertyId, updatedData);
        if(!updatedProperty) throw new BadRequestError("Failed to update property details. Please check the provided information and try again.")
        return updatedProperty;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during updating property.");
    }
  }

  async blockProperty(propertyId: string, isBlocked: boolean): Promise<IPropertyDoc | null> {
    try {
        const response = await this.propertyRepository.blockProperty(propertyId, isBlocked);
        if(!response) throw new BadRequestError("Failed to change the status of the property");

        return response;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during blocking property.");
    }
  }

}
