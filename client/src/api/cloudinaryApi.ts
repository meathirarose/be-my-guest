import axios from "axios";

export const uploadMediaToCloudinary = async (
  selectedFile: File,
  folder: string,
  uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
    "DEFAULT_PRESET",
  cloudName = import.meta.env.VITE_CLOUDINARY_NAME,
  setIsUploading?: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | null> => {
  if (!selectedFile) {
    console.error("No file selected or uploaded");
    return null;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const isImage = selectedFile.type.startsWith("image");
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${
    isImage ? "image" : "video"
  }/upload`;

  try {
    if(setIsUploading) setIsUploading(true);

    const response = await axios.post(uploadUrl, formData);
    return response.data.secure_url;
    
  } catch (error) {
    console.error("Error uploading media to Cloudinary:", error);
    return null;
  } finally {
    if (setIsUploading) setIsUploading(false);
  }
};
