import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/property-owner/common/SideBar";
import Header from "../components/property-owner/common/Header";


const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full">
        <Header />
        <div className="flex-1 p-6 px-6 py-28 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
