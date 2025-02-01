import axios from "axios";

interface PropertyDetails {
  propertyName: string;
  buildYear: string;
  liveAtProperty: boolean;
  contactEmail: string;
  contactMobile: string;
  contactLandline: string;
}

interface LocationDetails {
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

export const sendPropertyBasicInfo = async (
  propertyDetails: PropertyDetails
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/basic-info/add-basic-info`,
      propertyDetails,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log(response.data, "Success!");
    } else {
      console.error("Error from backend", response);
    }
    return response;
  } catch (error) {
    console.error("Error sending property details:", error);
    throw error;
  }
};

export const sendPropertyLocation = async (
  locationDetails: LocationDetails
) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/location-details/add-location-details`,
      locationDetails,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error sending location details:", error);
    throw error;
  }
};

export const sendRoomsAndSpaces = async (
  roomsAndSpaces: RoomsAndSpaces

) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/rooms-spaces/add-rooms-spaces`,
      roomsAndSpaces,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error sending information about rooms and spaces :", error);
    throw error;
  }
};

