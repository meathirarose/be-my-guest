import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastNotification from "./components/ToastNotification";
import CustomerRoutes from "./routes/CustomerRoutes";
import PropertyOwnerRoutes from "./routes/PropertyOwnerRoutes";
import VerifyEmail from "./shared/components/auth/VerifyEmail";
import ConfirmVerifyEmail from "./shared/components/auth/ConfirmVerifyEmail";
import AdminRoutes from "./routes/AdminRoutes";
import ForgotPassword from "./shared/components/auth/ForgotPassword";
import ResetPassword from "./shared/components/auth/ResetPassword";

const App: React.FC = () => {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        {/* Shared Public Routes */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/success-verification" element={<ConfirmVerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        

        {/* Customer-Specific Routes */}
        <Route path="/*" element={<CustomerRoutes />} />

        {/* Property Owner-Specific Routes */}
        <Route path="/host/*" element={<PropertyOwnerRoutes />} />

        {/* Admin-Specific Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

      </Routes>
    </Router>
  );
};

export default App;
