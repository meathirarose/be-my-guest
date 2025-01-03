import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./pages/customer/LoginPage";
import CustomerLanding from "./pages/customer/LandingPage";
import CustomerSignUp from "./pages/customer/SignUpPage";
import VerifyEmail from "./pages/customer/VerifyEmailPage";
import ConfirmVerifyEmail from "./pages/customer/ConfirmVerifyEmailPage";
import PropertyOwnerLanding from "./pages/property-owner/LandingPage";
import PropertyOwnerSignUp from "./pages/property-owner/SignUpPage";
import PropertyOwnerSignIn from "./pages/property-owner/SignInPage";
import PropertyOwnerDashboard from "./pages/property-owner/Dashboard";
import Home from "./pages/customer/Home";
import ToastNotification from "./components/ToastNotification";
import PrivateRouteForCustomer from "./routes/PrivateRouteForCustomer";
import PrivateRouteForPropertyOwner from "./routes/PrivateRouteForPropertyOwner";

const App: React.FC = () => {

  return (
    <Router>
      <ToastNotification />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<CustomerLanding />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/success-verification" element={<ConfirmVerifyEmail />} />
        <Route path="/host-landing" element={<PropertyOwnerLanding />} />
        <Route path="/host-signup" element={<PropertyOwnerSignUp />} />
        <Route path="/host-signin" element={<PropertyOwnerSignIn />} />

        {/* Private Routes for Customers */}
        <Route element={<PrivateRouteForCustomer />}>
          <Route path="/user-home" element={<Home />} />
        </Route>

        {/* Private Routes for Property Owners */}
        <Route element={<PrivateRouteForPropertyOwner />}>
          <Route path="/host-home" element={<PropertyOwnerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
