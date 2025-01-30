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
    pincode: string,
    country: string;
    state: string;
    city: string;
}
  
export const sendPropertyBasicInfo = async (propertyDetails: PropertyDetails) => {
try {
    const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/property-service/api/property/list-property-basic-info`,
    propertyDetails,
    { withCredentials: true }
    );
    console.log(response, "front end il ninn olla response--------------------------")
    return response;
} catch (error) {
    console.error("Error sending property details:", error);
    throw error;
}
};
  
export const sendPropertyLocation = async (locationDetails: LocationDetails) => {
try {
    const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/property-service/api/property/list-property-location-details`,
    locationDetails,
    { withCredentials: true }
    );
    console.log("send property location from list property api====>",response)
    return response;
} catch (error) {
    console.error("Error sending location details:", error);
    throw error;
}
};
  