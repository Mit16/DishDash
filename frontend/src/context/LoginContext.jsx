import { createContext, useState } from "react";

export const LoginContext = createContext(null);

const LoginContextProvider = (props) => {
 

  // const { fetchFoodList } = useContext(StoreContext);

  

  const LogincontextValue = {

  };

  return (
    <LoginContext.Provider value={LogincontextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
