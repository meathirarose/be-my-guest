import mongoose from "mongoose";

export interface ILocationDetailsAttrs {
    houseName: string;
    locality: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
} 

export interface ILocationDetailsDoc extends mongoose.Document {
    id: string;
    houseName: string;
    locality: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
}

export interface ILocationDetailsModel extends mongoose.Model<ILocationDetailsDoc> {
    build(attrs: ILocationDetailsAttrs): ILocationDetailsAttrs;
}