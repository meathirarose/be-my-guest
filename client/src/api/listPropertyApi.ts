import { PropertyFormData } from "../interfaces/ListPropertyDetails";
import axiosInstance from "./axiosInterceptor";

// adding property
export const listProperty = async (propertyData: PropertyFormData, userId?: string) => {
  try {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/add-property`,
      propertyData,
      {
        params: { userId }, 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending property details:", error);
    throw error;
  }
};

// fetching all properties
export const fetchAllProperties = async () => {
  try {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/fetch-properties`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
}

// fetching a single property by its id
export const fetchPropertyById = async (propertyId: string) => {
  try {
    const response = await axiosInstance.get(
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

// update a property
export const updateProperty = async (
  propertyId: string | undefined,
  formData: PropertyFormData,
) => {
  try {
    const response = await axiosInstance.patch(
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

// blocking the property by admin
export const blockProperty = async (propertyId: string, isBlocked: boolean) => {
  try {
    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/property-service/api/properties/block-property/${propertyId}`, 
      { isBlocked }
    );
    console.log("response from the api===================================>", response);
    return response;
  } catch (error) {
    console.log("Error in blocking the property:", error);
    throw error;
  }
}

