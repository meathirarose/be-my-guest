export interface PropertyBasicInfo {
    propertyName: string,
    propertyDescription: string,
    buildYear: string,
    liveAtProperty: boolean,
    contactEmail: string,
    contactMobile: string,
    contactLandline: string,
  }
  
  export interface PropertyLocation {
    houseName: string,
    locality: string,
    pincode: string, 
    country: string,
    state: string,
    district: string, 
    city: string,
  }
  
  export interface RoomsAndSpaces {
    bedrooms: number,
    bathrooms: number,
    livingRoom: number,
    lobbyLounge: number,
    helpersRoom: number,
    swimmingPool: number,
    parking: number, 
    driversRoom: number,
    terrace: number,
    garden: number,
    diningArea: number,
    kitchenAvailable: boolean,
  }
  
  export interface PropertyPricing {
    price: string,
    availability: string,
  }
  
  export interface PropertyFormData {
    id?: string,
    basicInfo: PropertyBasicInfo,
    location: PropertyLocation,
    roomsAndSpaces: RoomsAndSpaces,
    mediaUrls: string[], 
    pricing: PropertyPricing,
  }