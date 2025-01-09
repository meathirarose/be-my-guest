import React from "react";
import { FiEdit, FiBookOpen, FiMessageSquare, FiRefreshCcw } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import Header from "../../components/customer/Header";
import Footer from "../../shared/components/layout/Footer";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;

  console.log(user, "user--------------------------------------------------from profile");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-1 pt-24 pb-4">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white shadow-lg p-14 min-h-screen">
          <ul className="space-y-12">
            <li>
              <Link
                to="/customer/profile"
                className="flex items-center space-x-3 text-purple-700 font-bold bg-gray-200 p-3 rounded-lg"
              >
                <FiEdit className="text-xl" />
                <span>Your Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/bookings"
                className="flex items-center space-x-3 text-gray-600 hover:text-purple-700 bg-gray-50 hover:bg-gray-200 p-3 rounded-lg"
              >
                <FiBookOpen className="text-xl" />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/refunds"
                className="flex items-center space-x-3 text-gray-600 hover:text-purple-700 bg-gray-50 hover:bg-gray-200 p-3 rounded-lg"
              >
                <FiRefreshCcw className="text-xl" />
                <span>Refunds</span>
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="flex items-center space-x-3 text-gray-600 hover:text-purple-700 bg-gray-50 hover:bg-gray-200 p-3 rounded-lg"
              >
                <FiMessageSquare className="text-xl" />
                <span>Messages</span>
              </Link>
            </li>
          </ul>
        </aside>

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
              <button className="flex items-center space-x-2 px-4 py-2 bg-purple-700 text-white font-semibold rounded-md shadow-sm hover:bg-purple-800">
                <FiEdit className="text-xl" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Full Name and Email Address */}
            <div className="grid grid-cols-1 gap-6">
              {/* Full Name */}
              <div className="flex items-center space-x-4">
                <label className="w-1/3 text-gray-600 font-medium">Full Name</label>
                <input
                  type="text"
                  value={userInfo?.name || "N/A"}
                  disabled
                  className="w-6/12 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
                />
              </div>

              {/* Email Address */}
              <div className="flex items-center space-x-4">
                <label className="w-1/3 text-gray-600 font-medium">Email Address</label>
                <input
                  type="email"
                  value={userInfo?.email || "N/A"}
                  disabled
                  className="w-6/12 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
