import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PrivateRouteForCustomer: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isVerified
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  if (!isAuthenticated || userRole !== "customer") {
    return <Navigate to="/customer/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRouteForCustomer;
