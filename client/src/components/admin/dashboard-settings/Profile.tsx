import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = user.user;
  return (
    <div>
      <div className=" p-6 rounded-md">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center space-x-4">
            <label className="w-44 text-gray-600 font-medium">Full Name</label>
            <input
              type="text"
              value={userInfo?.name || "N/A"}
              disabled
              className="w-80 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-44 text-gray-600 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={userInfo?.email || "N/A"}
              disabled
              className="w-80 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="w-44 text-gray-600 font-medium">Country</label>
            <input
              type="email"
              value={userInfo?.country || "N/A"}
              disabled
              className="w-80 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:border-purple-700 focus:ring-2 focus:ring-purple-200 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
