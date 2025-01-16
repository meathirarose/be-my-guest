import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoute: React.FC = () => {

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isVerified
  );
  const userRole = useSelector((state: RootState) => state.user?.user?.role);

  if (isAuthenticated) {    
    if(userRole === 'customer')
      return <Navigate to="/customer/home" replace />;
    else if(userRole === 'property-owner')
      return <Navigate to="/host/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
