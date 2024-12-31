import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLogin from "./pages/customer/LoginPage"; 
import CustomerLanding from "./pages/customer/LandingPage";   
import CustomerSignUp from "./pages/customer/SignUpPage";
import VerifyEmail from "./pages/customer/VerifyEmailPage";
import ConfirmVerifyEmail from "./pages/customer/ConfirmVerifyEmailPage";
import PropertyOwnerLanding from "./pages/property-owner/LandingPage";
import PropertyOwnerSignUp from './pages/property-owner/SignUpPage';
import PropertyOwnerSignIn from './pages/property-owner/SignInPage';
import PropertyOwnerHome from './pages/property-owner/Home';
import Home from "./pages/customer/Home";
import ToastNotification from "./components/ToastNotification";

const App: React.FC = () => {
  return (
    <Router>
      <ToastNotification />
      <Routes>
        <Route path="/" element={<CustomerLanding />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/success-verification" element={<ConfirmVerifyEmail />} />
        <Route path="/user-home" element={<Home />} />
        <Route path="/host-landing" element={<PropertyOwnerLanding />} />{/* for property-owner */}
        <Route path="/host-signup" element={<PropertyOwnerSignUp />} />{/* for property-owner */}
        <Route path="/host-signin" element={<PropertyOwnerSignIn />} />{/* for property-owner */}
        <Route path="/host-home" element={<PropertyOwnerHome />} />{/* for property-owner */}
      </Routes>
    </Router>
  );
};

export default App;
