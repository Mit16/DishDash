import { createContext } from "react";

export const PriceContext = createContext(null);

const PriceContextProvider = (props) => {
  const indianPrice = (price) => {
    return price * 30;
  };

  const PricecontextValue = {
    indianPrice,
  };

  return (
    <PriceContext.Provider value={PricecontextValue}>
      {this.children}
    </PriceContext.Provider>
  );
};

export default PriceContextProvider;
