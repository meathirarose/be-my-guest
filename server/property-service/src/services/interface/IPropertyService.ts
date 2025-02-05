import { IPropertyDoc } from "../../models/interface/IPropertyModel";

export interface IPropertyService {
    listProperty(
        basicInfo: IPropertyDoc["basicInfo"], 
        location: IPropertyDoc["location"], 
        roomsAndSpaces: IPropertyDoc["roomsAndSpaces"], 
        mediaUrls: IPropertyDoc["mediaUrls"], 
        pricing: IPropertyDoc["pricing"]
    ): Promise<IPropertyDoc | null>;
    fetchProperties(): Promise<IPropertyDoc[] | null>;
}
