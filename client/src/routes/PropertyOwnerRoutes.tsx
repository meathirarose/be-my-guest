import React from "react";
import { Routes, Route } from "react-router-dom";
import PropertyOwnerLanding from "../pages/property-owner/Landing";
import PropertyOwnerSignUp from "../pages/property-owner/SignUp";
import PropertyOwnerSignIn from "../pages/property-owner/Login";
import PropertyOwnerDashboard from "../pages/property-owner/Dashboard";
import PrivateRouteForPropertyOwner from "./PrivateRouteForPropertyOwner";

const PropertyOwnerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/host-landing" element={<PropertyOwnerLanding />} />
    <Route path="/signin" element={<PropertyOwnerSignIn />} />
    <Route path="/signup" element={<PropertyOwnerSignUp />} />

    {/* Private Routes */}
    <Route element={<PrivateRouteForPropertyOwner />}>
      <Route path="/dashboard" element={<PropertyOwnerDashboard />} />
    </Route>
  </Routes>
);

export default PropertyOwnerRoutes;
