import { IPropertyDoc } from "../../models/interface/IPropertyModel";
import { IBaseRepository } from "./IBaseRepository";

export interface IPropertyRepository extends IBaseRepository<IPropertyDoc> {
  savePropertyDetails(
    basicInfo: IPropertyDoc["basicInfo"],
    location: IPropertyDoc["location"],
    roomsAndSpaces: IPropertyDoc["roomsAndSpaces"],
    mediaUrls: IPropertyDoc["mediaUrls"],
    pricing: IPropertyDoc["pricing"]
  ): Promise<IPropertyDoc>;

  fetchAllProperties(): Promise<IPropertyDoc[] | null>;
}
