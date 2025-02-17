import mongoose, { Schema } from "mongoose";
import { IPropertyAttrs, IPropertyDoc, IPropertyModel } from "../interface/IPropertyModel";

const propertySchema: Schema = new Schema(
  {
    basicInfo: {
      propertyName: { type: String, required: true },
      propertyDescription: { type: String, required: true },
      buildYear: { type: String, required: true },
      liveAtProperty: { type: Boolean, default: false },
      contactEmail: { type: String, required: true },
      contactMobile: { type: String, required: true },
      contactLandline: { type: String },
    },
    location: {
      houseName: { type: String, required: true },
      locality: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
    },
    roomsAndSpaces: {
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
      kitchenAvailable: { type: Boolean, default: false },
    },
    mediaUrls: [{ type: String }],
    pricing: {
      price: { type: String, required: true },
      availability: { type: String, required: true },
    },
    userId: {
      type: String
    }
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

propertySchema.statics.build = (attrs: IPropertyAttrs) => {
  return new Property(attrs);
};

const Property = mongoose.model<IPropertyDoc, IPropertyModel>("Property", propertySchema);

export { Property };