import { IPropertyDoc } from "../../models/interface/IPropertyModel";

export interface IPropertyService {
    listProperty(
        basicInfo: IPropertyDoc["basicInfo"], 
        location: IPropertyDoc["location"], 
        roomsAndSpaces: IPropertyDoc["roomsAndSpaces"], 
        mediaUrls: IPropertyDoc["mediaUrls"], 
        pricing: IPropertyDoc["pricing"],
        userId?: string 
    ): Promise<IPropertyDoc | null>;
    fetchPropertiesByUser(userId: string): Promise<IPropertyDoc[] | null>;
    fetchProperties(): Promise<IPropertyDoc[] | null>;
    fetchProperty(propertyId: string): Promise<IPropertyDoc | null>;
    updateProperty(propertyId: string, updatedData: Partial<IPropertyDoc>): Promise<IPropertyDoc | null>;
    blockProperty(propertyId: string, isBlocked: boolean): Promise<IPropertyDoc | null>;
}
