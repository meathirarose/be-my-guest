import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/Dashboard";

const CustomerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/dashboard" element={<AdminDashboard />} />
  </Routes>
);

export default CustomerRoutes;
