import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";
import Sidebar from "../../components/common/SideBar";
import { updateProfile, uploadImageToCloudinary } from "../../api/userAuthApi";
import { updateUser } from "../../redux/user/userSlice";
import { message } from "antd";
import { Pencil } from "lucide-react";
import InputField from "../../shared/components/ui/InputField";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;

  const dispatch = useDispatch();

  const [editedName, setEditedName] = useState(userInfo?.name || "");
  const [editedEmail, setEditedEmail] = useState(userInfo?.email || "");
  const [editedCountry, setEditedCountry] = useState(userInfo?.country || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(userInfo?.profileImage || "");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef?.current?.click();
  };

  const handleUpdateProfile = async () => {
    try {
      let imageurl = userInfo?.profileImage || "";

      if (selectedFile) {
        const uploadedUrl = await uploadImageToCloudinary(selectedFile, undefined, undefined, setIsUploading);
        if (uploadedUrl) imageurl = uploadedUrl;
      }

      await updateProfile(editedName, editedEmail, editedCountry, imageurl);
      dispatch(updateUser({ name: editedName, country: editedCountry, profileImage: imageurl }));
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditedName(userInfo?.name || "");
    setEditedEmail(userInfo?.email || "");
    setEditedCountry(userInfo?.country || "");
    setSelectedFile(null);
    setPreviewImage(userInfo?.profileImage || "");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1 pt-24 pb-4">
        <Sidebar />

        <main className="flex-1 bg-white p-8 rounded-lg shadow-md">
          <div className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800">Your Profile</h3>
          </div>

          <div className="flex flex-col items-start mb-2 ">
            {/* Profile Image Section */}
            <div className="relative mb-4">
              <img
                src={previewImage || ""}
                alt={`${userInfo?.name || "User"} profile`}
                className="w-28 h-28 rounded-full object-cover border-4 border-purple-600 shadow-md cursor-pointer"
                onClick={handleProfileImageClick}
              />
              <button
                className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 shadow-md hover:bg-purple-700 transition-colors"
                onClick={handleProfileImageClick}
              >
                <Pencil size={18} />
              </button>
            </div>
            <InputField
              type="file"
              name=""
              placeholder=""
              value=""
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              hidden={true}
            />
          </div> 
           

          {/* Profile Details Section */}
          <div className="space-y-2 items-center ml-5">
            <div className="flex items-center w-full">
              <label className="w-1/3 text-gray-600 font-medium">Full Name</label>
              <div className="w-2/3">
                <InputField
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mr-5 w-full">
              <label className="w-1/3 text-gray-600 font-medium">Email Address</label>
              <div className="w-2/3">
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 w-full">
              <label className="w-1/3 text-gray-600 font-medium">Country</label>
              <div className="w-2/3">
                <InputField
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={editedCountry}
                  onChange={(e) => setEditedCountry(e.target.value)}
                />
              </div>
            </div>
          </div>


          {/* Buttons */}
          <div className="mt-8 flex justify-start space-x-6">
            <button
              onClick={handleUpdateProfile}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save Changes"}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

