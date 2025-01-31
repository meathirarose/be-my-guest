import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";
import { IBaseRepository } from "./IBaseRepository";

export interface ILocationDetailsRepository extends IBaseRepository<ILocationDetailsDoc> {
    saveLocationDetails(data: ILocationDetailsDoc): Promise<ILocationDetailsDoc | null>;
    findByPropertyId(propertyId: string): Promise<ILocationDetailsDoc | null>;
}
