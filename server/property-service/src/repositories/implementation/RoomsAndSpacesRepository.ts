import { Model } from "mongoose";
import { IRoomsAndSpacesDoc } from "../../models/interface/IRoomsAndSpacesModel";
import { IRoomsAndSpacesRepository } from "../interface/IRoomsAndSpacesRepository";
import { BaseRepository } from "./BaseRepository";

export class RoomsAndSpacesRepository extends BaseRepository<IRoomsAndSpacesDoc> implements IRoomsAndSpacesRepository {
    private roomsAndSpacesModel: Model<IRoomsAndSpacesDoc>;

    constructor(roomsAndSpacesModel: Model<IRoomsAndSpacesDoc>) {
        super(roomsAndSpacesModel);
        this.roomsAndSpacesModel = roomsAndSpacesModel;
    }

    async saveRoomsAndSpaces(data: IRoomsAndSpacesDoc): Promise<IRoomsAndSpacesDoc> {
        return await this.save(data);
    }
}