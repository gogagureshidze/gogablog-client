import React, { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

// UserContext provider component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    console.log("Loaded user from localStorage:", storedUser);
    setUserInfo(JSON.parse(storedUser));
  }
}, []);

useEffect(() => {
  if (userInfo) {
    console.log("Setting userInfo to localStorage:", userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  }
}, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
