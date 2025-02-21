import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Pencil } from "lucide-react";
import { updateProfile } from "../../../api/userAuthApi";
import { updateUser } from "../../../redux/user/userSlice";
import { Button, message, Spin } from "antd";
import { uploadMediaToCloudinary } from "../../../api/cloudinaryApi";
import InputField from "../../../shared/components/ui/InputField";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;
  const dispatch = useDispatch();

  const [editedName, setEditedName] = useState(userInfo?.name || "");
  const [editedEmail, setEditedEmail] = useState(userInfo?.email || "");
  const [editedCountry, setEditedCountry] = useState(userInfo?.country || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    userInfo?.profileImage || ""
  );
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => fileInputRef?.current?.click();

  const handleUpdateProfile = async () => {
    try {
      setIsUploading(true);
      let imageUrl = userInfo?.profileImage || "";
  
      if (selectedFile) {
        const uploadedResponse = await uploadMediaToCloudinary(
          selectedFile,
          "be-my-guest/profile-images"
        );
  
        if (uploadedResponse?.secure_url) {
          imageUrl = uploadedResponse.secure_url;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      await updateProfile(editedName, editedEmail, editedCountry, imageUrl);
      dispatch(updateUser({ name: editedName, country: editedCountry, profileImage: imageUrl }));
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile.");
    } finally {
      setIsUploading(false);
    }
  };
  

  const handleCancel = () => {
    setEditedName(userInfo?.name || "");
    setEditedCountry(userInfo?.country || "");
    setSelectedFile(null);
    setPreviewImage(userInfo?.profileImage || "");
  };

  return (
    <Spin spinning={isUploading} tip="Updating profile...">
      <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-xl">
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={previewImage || ""}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-purple-600 shadow-md cursor-pointer"
              onClick={handleProfileImageClick}
            />
            <button
              className="absolute bottom-2 right-2 bg-purple-600 text-white rounded-full p-2 shadow-md hover:bg-purple-700"
              onClick={handleProfileImageClick}
            >
              <Pencil size={16} />
            </button>
            <InputField
              type="file"
              name="profileImage"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <InputField
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />

          <InputField
            type="email"
            name="email"
            value={userInfo?.email || ""}
            onChange={(e) => setEditedEmail(e.target.value)}
            disabled
          />

          <InputField
            type="text"
            name="country"
            placeholder="Country"
            value={editedCountry}
            onChange={(e) => setEditedCountry(e.target.value)}
          />
        </div>

        <div className="mt-6 flex space-x-4">
          <Button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800"
            disabled={isUploading}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default Profile;
