import axios from "axios";

interface PropertyBasicInfo {
  propertyName: string;
  buildYear: string;
  liveAtProperty: boolean;
  contactEmail: string;
  contactMobile: string;
  contactLandline: string;
}

interface PropertyLocation {
  houseName: string;
  locality: string;
  pincode: string;
  country: string;
  state: string;
  city: string;
}

interface RoomsAndSpaces {
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
}

interface PropertyPricing {
  price: string;
  availability: string;
}

interface PropertyFormData {
  basicInfo: PropertyBasicInfo;
  location: PropertyLocation;
  roomsAndSpaces: RoomsAndSpaces;
  mediaUrls: string[];
  pricing: PropertyPricing;
}

export const listProperty = async (propertyData: PropertyFormData, userId?: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/list-property`,
      propertyData,
      {
        params: { userId }, 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      console.log('Property listed successfully:', response.data);
    } else {
      console.error('Error from backend:', response);
    }
    return response;
  } catch (error) {
    console.error("Error sending property details:", error);
    throw error;
  }
};


export const fetchAllProperties = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/fetch-properties`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
}

export const fetchPropertyById = async (propertyId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/fetch-property/${propertyId}`,
      {         
        withCredentials: true,
      }
    );
    console.log("am I getting the response in list API?", response);
    return response;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
};

export const updateProperty = async (
  propertyId: string | undefined,
  formData: PropertyFormData,
) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/update-property/${propertyId}`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};

