import React, { createContext, useContext } from "react";
const userService = require("../services/user-service");

const UserContext = createContext();
const UserContexProvider = ({ children }) => {
  const user = userService.getLoggedOnUser();
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContexProvider;

export function useLoggedOnUser() {
  return useContext(UserContext);
}
