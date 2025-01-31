import { ILocationDetailsDoc } from "../../models/interface/ILocalityDetailsModel";

export interface ILocationDetailsService {
    addLocationDetails(details: ILocationDetailsDoc): Promise<ILocationDetailsDoc | null>;
}
