import axios from "axios";
import { PropertyFormData } from "../interfaces/ListPropertyDetails";

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

