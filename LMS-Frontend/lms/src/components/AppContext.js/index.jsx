import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [userDetails, setUserDetails] = useState();

  return (
    <AppContext.Provider
      value={{ role, setRole, id, setId, setUserDetails, userDetails }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
