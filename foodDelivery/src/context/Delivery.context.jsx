import { createContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./axiosConfig";

export const DeliveryContext = createContext(null);

const DeliveryContextProvider = (props) => {
  // Shared state for delivery data
  const [token, setToken] = useState(localStorage.getItem("Token") || null);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const navigate = useNavigate();

  const apiURL = "http://localhost:4000";
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch order history
  const fetchOrderHistory = async () => {
    try {
      const response = await axiosInstance.get("/api/delivery/orders/history");

      if (response.data.success) {
        setOrderHistory(response.data.data); // Store fetched orders in state
      } else {
        console.error(
          response.data.message || "Failed to fetch order history."
        );
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  // Fetch earnings
  const fetchDeliveredOrders = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/delivery/orders/delivered"
      );

      if (response.data.success) {
        return response.data.orders;
        // Keep only the top 5 orders
        // setDeliveredOrders(orders.slice(0, 5));
      } else {
        console.error(
          response.data.message || "Failed to fetch delivered orders."
        );
      }
    } catch (error) {
      console.error("Error fetching delivered orders:", error);
    }
  };

  // Fetch assigned orders
  const fetchAssignedOrders = async () => {
    // const token = localStorage.getItem("Token"); // Retrieve token directly
    if (!token) {
      console.warn("No token found, cannot fetch assigned orders.");
      return;
    }
    try {
      const response = await axiosInstance.get(
        "/api/delivery/getAssignedOrders"
      );

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

  const getOutForDeliveryOrders = async () => {
    // const token = localStorage.getItem("Token"); // Retrieve token directly
    if (!token) {
      console.warn("No token found, cannot fetch assigned orders.");
      return;
    }
    try {
      const response = await axiosInstance.get("/api/delivery/outfordelivery");

      return response.data.data;
    } catch (error) {
      console.error("Error fetching assigned orders:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching assigned orders."
      );
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await axiosInstance.post("/api/delivery/status", {
        orderId,
        orderStatus,
      });

      return response.data; // Return the response data for success/failure handling
    } catch (error) {
      console.error("Error updating order status:", error);
      throw new Error("An error occurred while updating order status.");
    }
  };

  const fetchDeliveryGuyDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/delivery/details");
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error(response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching delivery guy details:", error);
      return null;
    }
  };

  const fetchEarnings = async () => {
    try {
      const response = await axiosInstance.get("/api/delivery/earnings");
      if (response.data.success) {
        return response.data.totalEarnings;
      } else {
        console.error(response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching earnings:", error);
      return null;
    }
  };

  const markOrderAsDelivered = async (orderId) => {
    try {
      const response = await axiosInstance.put(
        `/api/delivery/orders/${orderId}/delivered`
      );

      if (response.data.success) {
        toast.success(response.data.message || "Order marked as delivered!");
        return true;
      } else {
        toast.error(
          response.data.message || "Failed to mark order as delivered."
        );
        return false;
      }
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      toast.error(error.response?.data?.message || "Server error.");
      return false;
    }
  };

  // Signout function
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
        if (token) {
          await fetchAssignedOrders();
          await fetchDeliveredOrders();
        }
      } else {
        console.error("No token found in localStorage!");
      }
    }
    loadData();
  }, []);

  const DeliveryContextValue = {
    assignedOrders,
    token,
    orderHistory,
    apiURL,
    totalEarnings,
    setToken,
    Signout,
    Signin,
    fetchDeliveredOrders,
    updateOrderStatus,
    fetchOrderHistory,
    getOutForDeliveryOrders,
    fetchDeliveryGuyDetails,
    fetchEarnings,
    markOrderAsDelivered,
  };

  return (
    <DeliveryContext.Provider value={DeliveryContextValue}>
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContextProvider;
