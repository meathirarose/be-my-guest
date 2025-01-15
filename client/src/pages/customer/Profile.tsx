// pages/Profile.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";
import Sidebar from "../../components/customer/profile/SideBar";
import { FiEdit } from "react-icons/fi";
import { updateProfile } from "../../api/userAuthApi"; 
import Modal from "../../components/customer/profile/UpdateProfileModal"; 
import { updateUser } from "../../redux/user/userSlice";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle profile update
  const handleUpdateProfile = async (name: string, email: string, country: string) => {
    try {
      const response = await updateProfile(name, email, country); // Call API to update profile
      console.log("Profile updated:", response);
      
      dispatch(updateUser({name, country}));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 pt-24 pb-4">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-8">
          {/* Welcome Message */}
          <div className="bg-white p-6 shadow-md rounded-md mb-8">
            <h2 className="text-lg font-semibold text-gray-600">Hello, {userInfo?.name || "Guest"}</h2>
            <p className="text-sm text-gray-500 mb-4">Have a great day!</p>
          </div>

          {/* User Information */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-700">Your Information</h3>
              <button
                onClick={() => setIsModalOpen(true)} // Open the modal on button click
                className="flex items-center space-x-2 px-4 py-2 bg-purple-700 text-white font-semibold rounded-md shadow-sm hover:bg-purple-800"
              >
                <FiEdit className="text-xl" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center space-x-4">
                <label className="w-1/3 text-gray-600 font-medium">Full Name</label>
                <input
                  type="text"
                  value={userInfo?.name || "N/A"}
                  disabled
                  className="w-6/12 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-1/3 text-gray-600 font-medium">Email Address</label>
                <input
                  type="email"
                  value={userInfo?.email || "N/A"}
                  disabled
                  className="w-6/12 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="w-1/3 text-gray-600 font-medium">Country</label>
                <input
                  type="email"
                  value={userInfo?.country || "N/A"}
                  disabled
                  className="w-6/12 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Modal to edit profile */}
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        userInfo={{ name: userInfo?.name || "", email: userInfo?.email || "", country: userInfo?.country || "" }}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
