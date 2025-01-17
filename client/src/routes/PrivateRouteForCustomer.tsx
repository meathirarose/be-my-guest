import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PrivateRouteForCustomer: React.FC = () => {

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isVerified
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);
  console.log(userRole, "user role aane from private router------------------------------------")
  if (!isAuthenticated || userRole !== "customer") {
    console.log("is authenticated alla")
    return <Navigate to="/customer/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRouteForCustomer;
