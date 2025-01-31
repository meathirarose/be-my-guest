import mongoose, { Schema } from "mongoose";
import { ILocationDetailsAttrs, ILocationDetailsDoc, ILocationDetailsModel } from "../interface/ILocalityDetailsModel";

const localityDetailsSchema: Schema = new Schema<ILocationDetailsDoc>(
  {
    houseName: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
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

localityDetailsSchema.statics.build = (attrs: ILocationDetailsAttrs) => {
    return new LocalDetails(attrs);
};
  
const LocalDetails = mongoose.model<ILocationDetailsDoc, ILocationDetailsModel>("LocalDetail", localityDetailsSchema);
  
export { LocalDetails };
