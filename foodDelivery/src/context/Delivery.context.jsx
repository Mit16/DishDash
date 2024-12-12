import { createContext, useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = ({ children }) => {
  // Shared state for delivery data
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [currentDelivery, setCurrentDelivery] = useState([]);
  const [currentState, setCurrentState] = useState(true);

  // Function to update delivery status
  const updateDeliveryStatus = (status) => {
    setDeliveryStatus(status);
  };

  // Function to set the current delivery details
  const assignCurrentDelivery = (deliveryDetails) => {
    setCurrentDelivery(deliveryDetails);
  };

  //temp
  const apiURL = "http://localhost:4000";

  const [orders, setOrders] = useState([]);

  const [token, setToken] = useState("");

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(apiURL + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);

        const allOrders = response.data.data;

        // Filter the not delivered orders
        const nonDeliveredOrders = allOrders.filter(
          (order) => order.status !== "Delivered"
        );

        console.log(nonDeliveredOrders);

        setCurrentDelivery(nonDeliveredOrders);
        console.log(currentDelivery);
      } else {
        toast.error("Unable to get orders list");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // setCurrentDelivery(
  //   orders.filter((order) => {
  //     order.status !== "Delivered";
  //   })
  // );

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(apiURL + "/api/orders/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const DeliveryContextValue = {
    deliveryStatus,
    currentDelivery,
    updateDeliveryStatus,
    assignCurrentDelivery,
    currentState,
    setCurrentState,
    orders,
    setOrders,
    statusHandler,
    token,
    setToken,
    apiURL,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;
