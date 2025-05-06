import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    // If no token is found, redirect to login page
    if (!token) {
        console.log("No token found, redirecting to login...");
        return <Navigate to="/admin/login" />;
    }

    return children;  // Render children if token exists
};

export default ProtectedAdminRoute;
