import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("staffToken");

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/staffLog" />;
  }

  // If the token exists, allow access to the route
  return children;
};

export default ProtectedRoute;
