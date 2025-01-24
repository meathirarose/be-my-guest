import React from "react";
import {
  HomeOutlined,
  DashboardOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  route: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // Define menu items
  const menuItems: MenuItem[] = [
    { icon: <DashboardOutlined className="text-2xl" />, label: "Dashboard", route: "/host/dashboard" },
    { icon: <HomeOutlined className="text-2xl" />, label: "Properties", route: "/host/add-property-start" },
    { icon: <CalendarOutlined className="text-2xl" />, label: "Bookings", route: "/host/bookings" },
    { icon: <DollarCircleOutlined className="text-2xl" />, label: "Payments", route: "/host/payments" },
    { icon: <MessageOutlined className="text-2xl" />, label: "Chats", route: "/host/chats" },
    { icon: <SettingOutlined className="text-2xl" />, label: "Settings", route: "/host/settings" },
    { icon: <QuestionCircleOutlined className="text-2xl" />, label: "Help", route: "/host/help" },
  ];

  return (
    <div className="w-64 text-white flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="text-2xl font-bold py-8 px-9">
        <span className="text-purple-700">Be My</span>{" "}
        <span className="text-black">Guest</span>
      </div>

      {/* Map through menu items */}
      <ul className="flex-1 space-y-6 px-6 py-4">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 text-gray-900 hover:text-white py-2 px-3 rounded-lg hover:bg-purple-800 cursor-pointer"
            onClick={() => navigate(item.route)} 
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
