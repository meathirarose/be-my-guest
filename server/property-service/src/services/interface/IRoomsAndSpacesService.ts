import { IRoomsAndSpacesDoc } from "../../models/interface/IRoomsAndSpacesModel";

export interface IRoomsAndSpacesService {
    addRoomsAndSpaces(details: IRoomsAndSpacesDoc): Promise<IRoomsAndSpacesDoc | null>;
}