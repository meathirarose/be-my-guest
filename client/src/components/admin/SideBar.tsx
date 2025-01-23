import React from "react";
import {
  Calendar1,
  FileQuestion,
  HandCoins,
  HousePlus,
  LayoutDashboard,
  MessagesSquare,
  School,
  Users,
  Wrench,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/admin/dashboard" },
    { label: "Customers", icon: Users, route: "/admin/customers" },
    { label: "Property Owners", icon: School, route: "/admin/property-owners" },
    { label: "Properties", icon: HousePlus, route: "/admin/properties" },
    { label: "Bookings", icon: Calendar1, route: "/admin/bookings" },
    { label: "Payments", icon: HandCoins, route: "/admin/payments" },
    { label: "Chats", icon: MessagesSquare, route: "/admin/chats" },
    { label: "Settings", icon: Wrench, route: "/admin/settings" },
    { label: "Help", icon: FileQuestion, route: "/admin/help" },
  ];

  return (
    <div className="w-64 bg-gray-100 shadow-xl text-white flex flex-col h-full">
      <div className="text-2xl font-bold py-8 px-9">
        <span className="text-purple-700">Be My</span>{" "}
        <span className="text-black">Guest</span>
      </div>

      <ul className="flex-1 space-y-6 px-6 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.route; 
          return (
            <li
              key={item.label}
              className="flex items-center space-x-4 py-2 px-3 rounded-lg cursor-pointer"
              onClick={() => navigate(item.route)}
            >
              <Icon
                size={20}
                className={`${
                  isActive ? "text-purple-800" : "text-gray-900"
                }`}
                strokeWidth={1.5}
              />
              <span
                className={`${
                  isActive ? "text-purple-800" : "text-gray-900"
                }`}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
