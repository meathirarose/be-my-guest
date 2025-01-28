import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiEdit,
  FiBookOpen,
  FiMessageSquare,
  FiRefreshCcw,
} from "react-icons/fi";
import {
  HomeOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
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
import { RootState } from "../../redux/store";

interface MenuItem {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  route: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useSelector((state: RootState) => state.user.user?.role);

  // Define menu items for each role
  const customerMenu: MenuItem[] = [
    { label: "Your Profile", icon: FiEdit, route: "/profile" },
    { label: "Bookings", icon: FiBookOpen, route: "/bookings" },
    { label: "Refunds", icon: FiRefreshCcw, route: "/refunds" },
    { label: "Messages", icon: FiMessageSquare, route: "/messages" },
  ];

  const propertyOwnerMenu: MenuItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/host/dashboard" },
    { label: "Properties", icon: HomeOutlined, route: "properties" },
    { label: "Bookings", icon: CalendarOutlined, route: "/host/bookings" },
    { label: "Payments", icon: DollarCircleOutlined, route: "/host/payments" },
    { label: "Chats", icon: MessageOutlined, route: "/host/chats" },
    { label: "Settings", icon: SettingOutlined, route: "settings" },
    { label: "Help", icon: QuestionCircleOutlined, route: "/host/help" },
  ];

  const adminMenu: MenuItem[] = [
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

  // Select the correct menu based on role
  let menuItems: MenuItem[] = [];
  if (role === "customer") {
    menuItems = customerMenu;
  } else if (role === "property-owner") {
    menuItems = propertyOwnerMenu;
  } else if (role === "admin") {
    menuItems = adminMenu;
  }

  return (
    <div className="w-64 bg-white shadow-xl text-white flex flex-col min-h-screen border-r-2 border-gray-200">
      <ul
        className={`flex-1 space-y-6 px-6 ${
          role === "customer" ? "py-6" : "py-28"
        }`}
      >
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
                className={`${isActive ? "text-purple-800" : "text-gray-900"}`}
                strokeWidth={1.5}
              />
              <span
                className={`${isActive ? "text-purple-800" : "text-gray-900"}`}
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
