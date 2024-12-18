import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = ({ children }) => {
  // Shared state for delivery data
  const [token, setToken] = useState(localStorage.getItem("Token") || null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [deliveredOrder, setDeliveredOrder] = useState([]);

  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();
  const apiURL = "http://localhost:4000";

  const [orders, setOrders] = useState([]);

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

  const fetchAssignedOrders = async () => {
    // const token = localStorage.getItem("Token"); // Retrieve token directly
    if (!token) {
      console.warn("No token found, cannot fetch assigned orders.");
      return;
    }
    try {
      const response = await axios.get(
        `${apiURL}/api/delivery/getAssignedOrders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setAssignedOrders(response.data.data);
      } else {
        console.error(
          "Failed to fetch assigned orders:",
          response.data.message
        );
        toast.error(
          response.data.message || "Failed to fetch assigned orders."
        );
      }
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching assigned orders."
      );
    }
  };

  const Signout = () => {
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
    setAssignedOrders([]);
  };

  // Signin function
  const Signin = (newToken) => {
    localStorage.setItem("Token", newToken);
    setToken(newToken);
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("Token");
      if (storedToken) {
        setToken(storedToken);
        await fetchEarnings();
        if (token) {
          await fetchAssignedOrders();
        }
      } else {
        console.error("No token found in localStorage!");
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
    Signout,
    Signin,
    totalEarnings,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;
