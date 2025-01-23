import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";
import PropertyList from "../pages/admin/Properties";
import CustomerList from "../pages/admin/Customers";
import Settings from "../pages/admin/Settings";

const CustomerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/dashboard" element={<AdminDashboard />} />
    <Route path="/properties" element={<PropertyList />} />
    <Route path="/customers" element={<CustomerList />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
);

export default CustomerRoutes;
