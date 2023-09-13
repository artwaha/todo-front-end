import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state="Unauthenticated, please login first" />
  );
};

export default ProtectedRoute;
