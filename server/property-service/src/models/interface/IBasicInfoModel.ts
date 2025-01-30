import mongoose from "mongoose";

export interface IBasicInfoAttrs {
    propertyName: string;
    buildYear: string;
    liveAtProperty: boolean;
    contactEmail: string;
    contactMobile: string;
    contactLandline: string;
} 

export interface IBasicInfoDoc extends mongoose.Document {
    id: string;
    propertyName: string;
    buildYear: string;
    liveAtProperty: boolean;
    contactEmail: string;
    contactMobile: string;
    contactLandline: string;
}

export interface IBasicInfoModel extends mongoose.Model<IBasicInfoDoc> {
    build(attrs: IBasicInfoAttrs): IBasicInfoAttrs;
}