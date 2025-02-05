import mongoose from "mongoose";

export interface IPropertyAttrs {
  basicInfo: {
    propertyName: string;
    buildYear: string;
    liveAtProperty: boolean;
    contactEmail: string;
    contactMobile: string;
    contactLandline?: string;
  };
  location: {
    houseName: string;
    locality: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
  };
  roomsAndSpaces: {
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
  };
  mediaUrls: string[];
  pricing: {
    price: string;
    availability: string;
  };
}

export interface IPropertyDoc extends mongoose.Document {
  id: string;
  basicInfo: {
    propertyName: string;
    buildYear: string;
    liveAtProperty: boolean;
    contactEmail: string;
    contactMobile: string;
    contactLandline?: string;
  };
  location: {
    houseName: string;
    locality: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
  };
  roomsAndSpaces: {
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
  };
  mediaUrls: string[];
  pricing: {
    price: string;
    availability: string;
  };
}

export interface IPropertyModel extends mongoose.Model<IPropertyDoc> {
  build(attrs: IPropertyAttrs): IPropertyDoc;
}