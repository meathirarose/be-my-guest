import mongoose, { Schema } from "mongoose";
import { IBasicInfoAttrs, IBasicInfoDoc, IBasicInfoModel } from "../interface/IBasicInfoModel";

const basicInfoSchema: Schema = new Schema<IBasicInfoDoc>(
  {
    propertyName: {
      type: String,
      required: true,
    },
    buildYear: {
      type: String,
      required: true,
    },
    liveAtProperty: {
      type: Boolean,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactMobile: {
      type: String,
      required: true,
    },
    contactLandline: {
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

basicInfoSchema.statics.build = (attrs: IBasicInfoAttrs) => {
    return new BasicInfo(attrs);
};
  
const BasicInfo = mongoose.model<IBasicInfoDoc, IBasicInfoModel>("BasicInfo", basicInfoSchema);
  
export { BasicInfo };
