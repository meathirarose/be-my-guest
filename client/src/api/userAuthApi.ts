import axios from "axios";
import axiosInstance from "./axiosInterceptor";
import { message } from "antd";

// user signin
export const signInUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/signin`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// user signup
export const SignUpUser = async (
  name: string,
  email: string,
  country: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/register`,
      {
        name,
        email,
        country,
        password,
        confirmPassword,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// verify email - common
export const VerifyEmail = async (token: string | null) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/user-service/api/users/verify-email?token=${token}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// signin property owner
export const SignInPropertyOwner = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/user-service/api/property-owners/signin-host`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// register property owner
export const registerPropertyOwner = async (
  name: string,
  email: string,
  country: string,
  password: string,
  confirmPassword: string
) => {
  try {
    console.log("Start - Register Property Owner");

    const response = await axios.post(
      `${
        import.meta.env.VITE_BASE_URL
      }/user-service/api/property-owners/register-host`,
      {
        name,
        email,
        country,
        password,
        confirmPassword,
      }
    );

    console.log("Response - Register Property Owner", response);
    return response;
  } catch (error) {
    console.error("Error - Register Property Owner", error);
    throw error;
  }
};

export const googleLogin = async ({ idToken }: { idToken: string }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/google-login`,
      { idToken },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/forgot-password`,
      { email }
    );
    return response;
  } catch (error) {
    console.error("Error during forgot password:", error);
    throw error;
  }
}

export const resetPassword = async (password: string, confirmPassword: string, token: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/reset-password`,
      { password, confirmPassword, token }
    );
    return response;
  } catch (error) {
    console.error("Error during reset password:", error);
    throw error;
  }
}

//updating the profile
export const updateProfile = async (name: string, email: string, country: string, profileImage: string) => {
  try {
    
    const response = await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/update-profile`,
      {
        name,
        email,
        country,
        profileImage
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during updating profile:", error);
    throw error;
  }
}

export const uploadImageToCloudinary = async (
  selectedFile: File,
  uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string || "EMPLOYEE_PHOTO",
  cloudName = import.meta.env.VITE_CLOUDINARY_NAME,
  setIsUploading?: React.Dispatch<React.SetStateAction<boolean>>,
  folder = "be-my-guest/profile-images" 
): Promise<string | null> => {
  if (!selectedFile) {
    message.error("No file selected or uploaded");
    return null;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder); 

  try {
    if (setIsUploading) setIsUploading(true);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  } finally {
    if (setIsUploading) setIsUploading(false);
  }
};


export const fetchAllCustomers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/fetch-customers`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export const fetchAllPropertyOwners = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/property-owners/fetch-property-owners`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user-service/api/users/logout-customer`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
