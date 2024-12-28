import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/customer/LoginPage"; 
import LandingPage from "./pages/customer/LandingPage";   
import SignUpPage from "./pages/customer/SignUpPage";
import VerifyEmailPage from "./pages/customer/VerifyEmailPage";
import ConfirmVerifyEmailPage from "./pages/customer/ConfirmVerifyEmailPage";
import PropertyOwnerLandingPage from './pages/property-owner/LandingPage';
import Home from "./pages/customer/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/success-verification" element={<ConfirmVerifyEmailPage />} />
        <Route path="/user-home" element={<Home />} />
        <Route path="/host-landing" element={<PropertyOwnerLandingPage />} />{/* for property-owner */}
      </Routes>
    </Router>
  );
};

export default App;
