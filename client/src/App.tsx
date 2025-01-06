import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToastNotification from "./components/ToastNotification";
import CustomerRoutes from "./routes/CustomerRoutes";
import PropertyOwnerRoutes from "./routes/PropertyOwnerRoutes";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ConfirmVerifyEmail from "./pages/auth/ConfirmVerifyEmail";

const App: React.FC = () => {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        {/* Shared Public Routes */}
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/success-verification" element={<ConfirmVerifyEmail />} />

        {/* Customer-Specific Routes */}
        <Route path="/*" element={<CustomerRoutes />} />

        {/* Property Owner-Specific Routes */}
        <Route path="/host/*" element={<PropertyOwnerRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
