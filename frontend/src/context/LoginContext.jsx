import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

const LoginContextProvider = (props) => {
  const URL = "http://localhost:4000";

  const [token, setToken] = useState("");

  //to store the token and prevent the logout when refreshed problem
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      setToken(localStorage.getItem("Token"));
    }
  }, []);

  const LogincontextValue = {
    URL,
    token,
    setToken,
  };

  return (
    <LoginContext.Provider value={LogincontextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
