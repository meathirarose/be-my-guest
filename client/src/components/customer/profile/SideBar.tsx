import React from "react";
import { FiEdit, FiBookOpen, FiMessageSquare, FiRefreshCcw } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-1/4 bg-white shadow-xl p-8 min-h-screen border-r-2 border-gray-200">
      <ul className="space-y-8">
        <li>
          <Link
            to="/customer/profile"
            className="flex items-center space-x-3 text-purple-600 font-semibold bg-purple-100 p-4 rounded-xl transition-all hover:bg-purple-200"
          >
            <FiEdit className="text-xl" />
            <span>Your Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/bookings"
            className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all"
          >
            <FiBookOpen className="text-xl" />
            <span>Bookings</span>
          </Link>
        </li>
        <li>
          <Link
            to="/refunds"
            className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all"
          >
            <FiRefreshCcw className="text-xl" />
            <span>Refunds</span>
          </Link>
        </li>
        <li>
          <Link
            to="/messages"
            className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl transition-all"
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
