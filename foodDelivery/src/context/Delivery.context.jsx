import { createContext, useState } from "react";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = ({ children }) => {
  // Shared state for delivery data
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [currentDelivery, setCurrentDelivery] = useState({});
  const [currentState, setCurrentState] = useState(true);

  // Function to update delivery status
  const updateDeliveryStatus = (status) => {
    setDeliveryStatus(status);
  };

  // Function to set the current delivery details
  const assignCurrentDelivery = (deliveryDetails) => {
    setCurrentDelivery(deliveryDetails);
  };

  const DeliveryContextValue = {
    deliveryStatus,
    currentDelivery,
    updateDeliveryStatus,
    assignCurrentDelivery,
    currentState,
    setCurrentState,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;
