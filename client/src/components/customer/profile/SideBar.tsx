import React from "react";
import { FiEdit, FiBookOpen, FiMessageSquare, FiRefreshCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
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
  );
};

export default Sidebar;
