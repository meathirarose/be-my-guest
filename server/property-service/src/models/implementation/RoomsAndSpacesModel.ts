import mongoose, { Schema } from "mongoose";
import {
  IRoomsAndSpacesAttrs,
  IRoomsAndSpacesDoc,
  IRoomsAndSpacesModel,
} from "../interface/IRoomsAndSpacesModel";

const roomsAndSpacesSchema = new Schema<IRoomsAndSpacesDoc>(
  {
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    livingRoom: { type: Number, default: 0 },
    lobbyLounge: { type: Number, default: 0 },
    helpersRoom: { type: Number, default: 0 },
    swimmingPool: { type: Number, default: 0 },
    parking: { type: Number, default: 0 },
    driversRoom: { type: Number, default: 0 },
    terrace: { type: Number, default: 0 },
    garden: { type: Number, default: 0 },
    diningArea: { type: Number, default: 0 },
    kitchenAvailable: { type: Boolean, required: true },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

roomsAndSpacesSchema.statics.build = (attrs: IRoomsAndSpacesAttrs) => {
  return new RoomsAndSpaces(attrs);
};

const RoomsAndSpaces = mongoose.model<IRoomsAndSpacesDoc, IRoomsAndSpacesModel>(
  "RoomsAndSpace",
  roomsAndSpacesSchema
);

export { RoomsAndSpaces };
