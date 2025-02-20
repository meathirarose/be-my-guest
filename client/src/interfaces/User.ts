export enum Role {
    CUSTOMER = 'customer',
    PROPERTY_OWNER = 'property-owner',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: "customer" | "property-owner" | "admin";
    country?: string;
    profileImage?: string;
    isBlocked?: boolean;
  }
