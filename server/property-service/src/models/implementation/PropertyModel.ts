import mongoose, { Schema } from "mongoose";
import { IPropertyAttrs, IPropertyDoc, IPropertyModel } from "../interface/IPropertyModel";

const propertySchema: Schema = new Schema<IPropertyDoc>(
  {
    basicInfo: {
        type: Schema.Types.ObjectId,
        ref: "BasicInfo",
        required: true,
    },
    locationDetails: {
        type: Schema.Types.ObjectId,
        ref: "LocationDetail",
        required: true,
    },
    roomsAndSpaces: {
        type: Schema.Types.ObjectId,
        ref: "RoomsAndSpace",
        required: true,
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
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
