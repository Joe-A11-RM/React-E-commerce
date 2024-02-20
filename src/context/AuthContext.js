import { createContext, useEffect, useState } from "react";

export let authcontext = createContext();
export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
      <authcontext.Provider value={{ token, setToken }}>
        {children}
      </authcontext.Provider>
    </>
  );
}
