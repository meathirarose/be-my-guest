import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerLogin from "../pages/customer/Login";
import CustomerLanding from "../pages/customer/Landing";
import CustomerSignUp from "../pages/customer/SignUp";
import Home from "../pages/customer/Home";
import PrivateRouteForCustomer from "./PrivateRouteForCustomer";
import Profile from "../pages/customer/Profile";

const CustomerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/customer" element={<CustomerLanding />} />
    <Route path="/customer/login" element={<CustomerLogin />} />
    <Route path="/customer/signup" element={<CustomerSignUp />} />
    <Route path="/customer/profile" element={<Profile />} />

    {/* Private Routes */}
    <Route element={<PrivateRouteForCustomer />}>
      <Route path="/customer/home" element={<Home />} />
    </Route>
  </Routes>
);

export default CustomerRoutes;
