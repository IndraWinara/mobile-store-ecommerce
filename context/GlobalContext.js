import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [token, setToken] = useState();

  const sendToken = { token, setToken };
  return (
    <GlobalContext.Provider value={{ sendToken }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
