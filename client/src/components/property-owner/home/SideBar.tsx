import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaCalendarAlt, FaHome, FaTaxi, FaMoneyCheck, FaComments, FaQuestionCircle } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-200 text-white flex flex-col h-full">
      <div className="text-2xl font-bold py-8 px-9">
        <span className="text-purple-700">Be My</span> <span className="text-black">Guest</span>
      </div>
      <ul className="flex-1 space-y-6 px-6 py-4">
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <MdDashboard className="text-2xl" />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaCalendarAlt className="text-2xl" />
          <span>Bookings</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaHome className="text-2xl" />
          <span>Properties</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaTaxi className="text-2xl" />
          <span>Taxi Service</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaMoneyCheck className="text-2xl" />
          <span>Payments</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaComments className="text-2xl" />
          <span>Chats</span>
        </li>
        <li className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer">
          <FaQuestionCircle className="text-2xl" />
          <span>Help</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
