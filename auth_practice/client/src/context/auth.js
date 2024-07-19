import React, { createContext, useContext, useState } from 'react';
const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setAuth = (val) => {
    setIsLoggedIn(val);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };