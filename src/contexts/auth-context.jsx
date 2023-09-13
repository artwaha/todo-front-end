import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthenticatedUserContex = ({ children }) => {
  let stored_isAuthenticated = localStorage.getItem("is-authenticated");
  const [isAuthenticated, setIsAuthenticated] = useState(
    stored_isAuthenticated !== null ? stored_isAuthenticated : false
  );

  const updateIsAuthenticated = (authStatus) => {
    setIsAuthenticated(authStatus);
    authStatus
      ? localStorage.setItem("is-authenticated", authStatus)
      : localStorage.removeItem("is-authenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticatedUserContex;

export function useAuthContext() {
  return useContext(AuthContext);
}
