import { FilterParams } from "../interfaces/FilterProperty";
import { PropertyFormData } from "../interfaces/Property";
import axiosInstance from "./axiosInterceptor";

// adding property
export const listProperty = async (
  propertyData: PropertyFormData,
  userId?: string
) => {
  try {
    const response = await axiosInstance.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/add-property`,
      propertyData,
      {
        params: { userId },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error sending property details:", error);
    throw error;
  }
};

// fetching all properties - according to user
export const fetchPropertiesByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/fetch-user-properties`,
      {
        params: { userId },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
};

// fetch all properties
export const fetchAllProperties = async () => {
  try {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/fetch-properties`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
};

// fetching a single property by its id
export const fetchPropertyById = async (propertyId: string) => {
  try {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/fetch-property/${propertyId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting property details:", error);
    throw error;
  }
};

// update a property
export const updateProperty = async (
  propertyId: string | undefined,
  formData: PropertyFormData
) => {
  try {
    const response = await axiosInstance.patch(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/update-property/${propertyId}`,
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
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/block-property/${propertyId}`,
      { isBlocked }
    );

    return response;
  } catch (error) {
    console.log("Error in blocking the property:", error);
    throw error;
  }
};

// add to the wishlist
export const addToWishlist = async (propertyId: string) => {
  try {
    const response = await axiosInstance.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/add-to-wishlist`,
      { propertyId }
    );
    console.log(response, "response from the list property api-------------------------addtowishlist")
    return response;
  } catch (error) {
    console.log("Error in wishlisting the property:", error);
    throw error;
  }
};

// remove from wishlist
export const removeFromWishlist = async (propertyId: string) => {
  try {
    const response = await axiosInstance.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/remove-from-wishlist`,
      { propertyId }
    );
    console.log(response, "response from the list property api-------------------------removefromwishlist")
    return response;
  } catch (error) {
    console.log("Error in removing property from wishlist:", error);
    throw error;
  }
}

// fetch all wishlists
export const fetchWishlist = async () => {
  try {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/fetch-wishlist`,
    );
    console.log(response, "response from the list property api---------------------------fetchwishllst");
    return response;
  } catch (error) {
    console.log("Error in fetching properties from wishlist:", error);
    throw error;
  }
}

// filter properties
export const filterProperties = async (filters: FilterParams) => {
  try {
    const response = await axiosInstance.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/property-service/api/properties/filter-properties`,
      filters
    );
    console.log(response.data, "response from the list property api---------------------------filterproperties");
    return response.data;
  } catch (error) {
    console.log("Error in filtering properties:", error);
    throw error;
  }
}