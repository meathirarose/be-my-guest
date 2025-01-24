import React from "react";
import { Routes, Route } from "react-router-dom";
import PropertyOwnerLanding from "../pages/property-owner/Landing";
import PropertyOwnerSignUp from "../pages/property-owner/SignUp";
import PropertyOwnerSignIn from "../pages/property-owner/Login";
import PropertyOwnerDashboard from "../pages/property-owner/Dashboard";
import PrivateRouteForPropertyOwner from "./PrivateRouteForPropertyOwner";
// import PropertyHostingStep1 from "../pages/property-owner/host-property/Step-1";
// import PropertyHostingStep2 from "../pages/property-owner/host-property/Step-1.1";
// import PropertyHostingStep3 from "../pages/property-owner/host-property/Step-1.2";
// import PropertyHostingStep4 from "../pages/property-owner/host-property/Step-1.3";
import PublicRoute from "./PublicRoute";
import AddProperty from "../components/property-owner/property/AddProperty";
import HostSettings from "../pages/property-owner/Settings";

const PropertyOwnerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route element={<PublicRoute />}>
      <Route path="/host-landing" element={<PropertyOwnerLanding />} />
      <Route path="/signin" element={<PropertyOwnerSignIn />} />
      <Route path="/signup" element={<PropertyOwnerSignUp />} />
    </Route>

    {/* Private Routes */}
    <Route element={<PrivateRouteForPropertyOwner />}>
      <Route path="/dashboard" element={<PropertyOwnerDashboard />} />
      <Route path="/add-property-start" element={<AddProperty />} />
      <Route path="/settings" element={<HostSettings />} />
      {/* <Route path="/host-property-step1" element={<PropertyHostingStep1 />} />
      <Route path="/host-property-step1.1" element={<PropertyHostingStep2 />} />
      <Route path="/host-property-step1.2" element={<PropertyHostingStep3 />} />
      <Route path="/host-property-step1.3" element={<PropertyHostingStep4 />} /> */}
    </Route>
  </Routes>
);

export default PropertyOwnerRoutes;
