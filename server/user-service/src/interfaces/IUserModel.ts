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
    phoneNumber?: number;
    password: string;
    role: Role;
    verified?: boolean;
    createdAt?: Date;
    profileImage?: string; 
    isBlocked?: boolean;
}

export interface IUserDoc extends mongoose.Document {
    id: string;
    name: string;
    email: string;
    country: string;
    phoneNumber: number;
    password: string;
    role: Role;
    verified: boolean,
    createdAt: Date;
    profileImage?: string; 
    isBlocked?: boolean;
}

export interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc;
}
