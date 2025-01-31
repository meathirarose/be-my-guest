import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";
import { IBaseRepository } from "./IBaseRepository";

export interface ILocationDetailsRepository extends IBaseRepository<ILocationDetailsDoc> {
    findByPropertyId(propertyId: string): Promise<ILocationDetailsDoc | null>;
}
