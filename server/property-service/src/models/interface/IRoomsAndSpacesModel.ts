import mongoose from "mongoose";

export interface IRoomsAndSpacesAttrs {
  bedrooms: number;
  bathrooms: number;
  livingRoom: number;
  lobbyLounge: number;
  helpersRoom: number;
  swimmingPool: number;
  parking: number;
  driversRoom: number;
  terrace: number;
  garden: number;
  diningArea: number;
  kitchenAvailable: boolean;
}

export interface IRoomsAndSpacesDoc extends mongoose.Document {
  bedrooms: number;
  bathrooms: number;
  livingRoom: number;
  lobbyLounge: number;
  helpersRoom: number;
  swimmingPool: number;
  parking: number;
  driversRoom: number;
  terrace: number;
  garden: number;
  diningArea: number;
  kitchenAvailable: boolean;
}

export interface IRoomsAndSpacesModel extends mongoose.Model<IRoomsAndSpacesDoc> {
    build(attrs: IRoomsAndSpacesAttrs): IRoomsAndSpacesDoc;
}