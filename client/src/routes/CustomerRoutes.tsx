import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouteForCustomer from "./PrivateRouteForCustomer";
import CustomerLanding from "../pages/customer/Landing";
import CustomerLogin from "../pages/customer/Login";
import CustomerSignUp from "../pages/customer/SignUp";
import Home from "../pages/customer/Home";
import Profile from "../pages/customer/Profile";
import PublicRoute from "./PublicRoute";

const CustomerRoutes: React.FC = () => (
  <Routes>
    {/* Public Routes */}
    <Route element = {<PublicRoute />}>
      <Route path="/" element={<CustomerLanding />} />
      <Route path="/customer/signup" element={<CustomerSignUp />} />
      <Route path="/customer/login" element={<CustomerLogin />} />
    </Route>

    {/* Private Routes */}
    <Route element={<PrivateRouteForCustomer />}>
      <Route path="/customer/home" element={<Home />} />
      <Route path="/customer/profile" element={<Profile />} />
    </Route>
  </Routes>
);

export default CustomerRoutes;
