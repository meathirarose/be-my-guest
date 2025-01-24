import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Pencil } from "lucide-react";
import { updateProfile, uploadImageToCloudinary } from "../../../api/userAuthApi";
import { updateUser } from "../../../redux/user/userSlice";
import { message } from "antd";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;

  const dispatch = useDispatch();

  const [editedName, setEditedName] = useState(userInfo?.name || "");
  const [editedCountry, setEditedCountry] = useState(userInfo?.country || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0])
      setSelectedFile(e.target.files[0]);
  }

  const handleProfileImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleUpdateProfile = async () => {
    try {

      let imageurl = userInfo?.profileImage || "";

      if(selectedFile){
        const uploadedUrl = await uploadImageToCloudinary(selectedFile, undefined, undefined, setIsUploading);
        if(uploadedUrl)
          imageurl = uploadedUrl;
      }

      await updateProfile(
        editedName,
        userInfo?.email || "",
        editedCountry,
        imageurl
      );
      dispatch(updateUser({ name: editedName, country: editedCountry, profileImage: imageurl}));
      message.success("Profile edited successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditedName(userInfo?.name || "");
    setEditedCountry(userInfo?.country || "");
    setSelectedFile(null);
  };

  return (
    <div className="p-6 rounded-md relative">
      {/* Save and Cancel Buttons */}
      <div className="absolute top-6 right-44 flex space-x-4">
        <button
          onClick={handleUpdateProfile}
          className="px-6 py-2 bg-purple-700 text-white font-semibold rounded-md shadow-sm hover:bg-purple-800"
          disabled={isUploading}
        >
        {isUploading? "Uploading": "Save"}
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md shadow-sm hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Profile Image Section */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={userInfo?.profileImage}
              alt={`${userInfo?.name || "User"} profile`}
              className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
              onClick={handleProfileImageClick}
            />
            <button
              className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1 hover:bg-purple-700 transition-colors"
              aria-label="Edit Profile Picture"
              onClick={handleProfileImageClick}
            >
              <Pencil size={16} />
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-60 text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-96 p-3 border rounded-md bg-white text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex items-center">
            <label className="w-60 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={userInfo?.email || ""}
              disabled
              className="w-96 p-3 border rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center">
            <label className="w-60 text-gray-600 font-medium">Country</label>
            <input
              type="text"
              value={editedCountry}
              onChange={(e) => setEditedCountry(e.target.value)}
              className="w-96 p-3 border rounded-md bg-white text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
