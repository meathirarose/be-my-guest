import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropertyOwnerLanding from "../pages/property-owner/Landing";
import PropertyOwnerSignUp from "../pages/property-owner/SignUp";
import PropertyOwnerSignIn from "../pages/property-owner/Login";
import PropertyOwnerDashboard from "../pages/property-owner/Dashboard";
import PrivateRouteForPropertyOwner from "./PrivateRouteForPropertyOwner";
import PublicRoute from "./PublicRoute";
import HostSettings from "../pages/property-owner/Settings";
import DashboardLayout from "../layouts/DashboardLayout";
import ProfileTab from "../components/property-owner/settings/ProfileTab";
import PasswordTab from "../components/property-owner/settings/PasswordTab";
import BookingsTab from "../components/property-owner/settings/BookingsTab";
import RefundsTab from "../components/property-owner/settings/RefundsTab";
import Properties from "../pages/property-owner/Property";
import AddPropertyPage from "../components/property-owner/property/AddProperty";
import AddPropertyStep1 from "../components/property-owner/property/AddPropertyStep1";
import AddPropertyStep2 from "../components/property-owner/property/AddPropertyStep2";
import AddPropertyStep3 from "../components/property-owner/property/AddPropertyStep3";
import AddPropertyStep4 from "../components/property-owner/property/AddPropertyStep4";
import AddPropertyStep5 from "../components/property-owner/property/AddPropertyStep5";

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
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<PropertyOwnerDashboard />} />
        <Route path="settings" element={<HostSettings />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfileTab />} />
          <Route path="password" element={<PasswordTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="refunds" element={<RefundsTab />} />
        </Route>
        <Route path="properties" element={<Properties />} />
        <Route
          path="properties/add-property-start"
          element={<AddPropertyPage />}
        >
          <Route path="step-1" element={<AddPropertyStep1 />} />
          <Route path="step-2" element={<AddPropertyStep2 />} />
          <Route path="step-3" element={<AddPropertyStep3 />} />
          <Route path="step-4" element={<AddPropertyStep4 />} />
          <Route path="step-5" element={<AddPropertyStep5 />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default PropertyOwnerRoutes;
