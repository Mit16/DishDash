import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = ({ children }) => {
  // Shared state for delivery data

  const [assignedOrders, setAssignedOrders] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);

  const [totalEarnings, setTotalEarnings] = useState(0);

  const apiURL = "http://localhost:4000";

  const [orders, setOrders] = useState([]);

  const [token, setToken] = useState("");

  const fetchEarnings = async () => {
    try {
      const response = await axios.get("/api/earnings");
      if (response.data.success) {
   
        setTotalEarnings(response.data.totalEarnings);
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
    }
  };

  const fetchAssignedOrders = async (userId) => {
    try {
      const response = await axios.post(
        URL + "/api/delivery/getAssignedOrders",
        { userId }
      );

      if (response.data.success) {
        setAssignedOrders(response.data.data); // Update state to display orders
      } else {
        console.error("Error fetching assigned orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("Token")) {
        setToken(localStorage.getItem("Token"));
        await fetchEarnings(localStorage.getItem("Token"));
        await fetchAssignedOrders("Token");
      }
    }
    loadData();
  }, []);

  const DeliveryContextValue = {
    assignedOrders,
    orders,
    setOrders,
    token,
    setToken,
    apiURL,
    deliveredOrder,
   
    totalEarnings,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;
