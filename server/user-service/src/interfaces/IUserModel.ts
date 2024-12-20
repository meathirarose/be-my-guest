import mongoose from "mongoose";

// enum for user roles
export enum Role {
    CUSTOMER = 'customer',
    PROPERTY_OWNER = 'property-owner',
    ADMIN = 'admin',
}

export interface IUserAttrs {
    name: string;
    email: string;
    country: string;
    password: string;
    role: Role;
    verified?: boolean,
    createdAt?: Date;
}

export interface IUserDoc extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    country: string;
    password: string;
    role: Role;
    verified: boolean,
    createdAt: Date;
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc;
}