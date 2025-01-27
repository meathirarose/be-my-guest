import React from "react";
import { Tabs } from "antd";
import { useLocation, Link } from "react-router-dom";
import { AndroidOutlined } from "@ant-design/icons";
import { User2, Calendar, RefreshCcw } from "lucide-react"; 
import { Outlet } from "react-router-dom";

const HostSettings: React.FC = () => {
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();

  const tabs = [
    {
      key: "profile",
      label: "Profile",
      icon: <User2 className="inline-block align-middle mr-4" size={16} />,
      path: "/host/dashboard/settings/profile",
    },
    {
      key: "password",
      label: "Password",
      icon: <AndroidOutlined className="inline-block align-middle mr-4" style={{ fontSize: 16 }} />,
      path: "/host/dashboard/settings/password",
    },
    {
      key: "bookings",
      label: "Bookings",
      icon: <Calendar className="inline-block align-middle mr-4" size={16} />, 
      path: "/host/dashboard/settings/bookings",
    },
    {
      key: "refunds",
      label: "Refunds",
      icon: <RefreshCcw className="inline-block align-middle mr-4" size={16} />, 
      path: "/host/dashboard/settings/refunds",
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs
        activeKey={activeTab}
        onChange={() => {}}
        items={tabs.map((tab) => ({
          key: tab.key,
          label: (
            <Link to={tab.path} className="flex items-center">
              {tab.icon}
              {tab.label}
            </Link>
          ),
        }))}
      />
      <Outlet />
    </div>
  );
};

export default HostSettings;
