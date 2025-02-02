import { message } from "antd";
import axios from "axios";

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