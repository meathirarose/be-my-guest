import mongoose from "mongoose";
import { IBasicInfoDoc } from "../interface/IBasicInfoModel";
import { ILocationDetailsDoc } from "../interface/ILocalityDetailsModel";
import { IRoomsAndSpacesDoc } from "./IRoomsAndSpacesModel";

export interface IPropertyAttrs {
    basicInfo: mongoose.Types.ObjectId | IBasicInfoDoc;
    locationDetails: mongoose.Types.ObjectId | ILocationDetailsDoc;
    roomsAndSpaces: mongoose.Types.ObjectId | IRoomsAndSpacesDoc
}

export interface IPropertyDoc {
    basicInfo: mongoose.Types.ObjectId | IBasicInfoDoc;
    locationDetails: mongoose.Types.ObjectId | ILocationDetailsDoc;
    roomsAndSpaces: mongoose.Types.ObjectId | IRoomsAndSpacesDoc
}

export interface IPropertyModel extends mongoose.Model<IPropertyDoc> {
    build(attrs: IPropertyAttrs): IPropertyDoc;
}