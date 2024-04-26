import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// The SecureRoute component is used to protect routes that require authentication.
const SecureRoute = () => {
  const { isAuthenticated } = useAuth(); 

  // If the user is authenticated, render the child components.
  return isAuthenticated ? (
    <Outlet /> 
  ) : (
    // Redirects the user to the login page if they are not authenticated.
    <Navigate to="/login" />
  );
};

export default SecureRoute;
