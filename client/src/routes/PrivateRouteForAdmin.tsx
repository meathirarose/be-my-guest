import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PrivateRouteForAdmin: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isVerified
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  if (!isAuthenticated || userRole !== "admin") {
    return <Navigate to="/host/signin" replace />;
  }

  return <Outlet />;
};

export default PrivateRouteForAdmin;
