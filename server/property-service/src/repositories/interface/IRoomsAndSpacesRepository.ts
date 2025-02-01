import { IRoomsAndSpacesDoc } from "../../models/interface/IRoomsAndSpacesModel";
import { IBaseRepository } from "./IBaseRepository";

export interface IRoomsAndSpacesRepository extends IBaseRepository<IRoomsAndSpacesDoc> {
    saveRoomsAndSpaces(data: IRoomsAndSpacesDoc): Promise<IRoomsAndSpacesDoc>;
}