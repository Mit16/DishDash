import { createContext, useState, useCallback, useMemo } from "react";
import { axiosInstance } from "./axiosConfig";

export const OrderContext = createContext(null);

const OrderContextProvider = (props) => {
  const [assignedOrders, setAssignedOrders] = useState([]);

  // Get all orders (Admin use case)
  // const getAllOrders = async () => {
  //   try {
  //     const response = await axiosInstance.get("/orders");
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(
  //       error.response?.data?.message || "Failed to fetch orders"
  //     );
  //   }
  // };

  // Get orders for a specific restaurant
  const getOrdersByRestaurant = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/orders/restaurant-orders`);
      setAssignedOrders(response.data.data);
      console.log("OrderController 40:", response.data.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch restaurant orders"
      );
    }
  }, []);

  // Get a specific order by ID
  // const getOrderById = async (orderId) => {
  //   try {
  //     const response = await axiosInstance.get(`/orders/${orderId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error(
  //       error.response?.data?.message || "Failed to fetch order details"
  //     );
  //   }
  // };

  // Update order status

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await axiosInstance.post("/api/orders/status", {
        orderId,
        orderStatus,
      });

      return response.data; // Return the response data for success/failure handling
    } catch (error) {
      console.error("Error updating order status:", error);
      throw new Error("An error occurred while updating order status.");
    }
  };

  // Delete an order
  const deleteOrder = async (orderId) => {
    try {
      const response = await axiosInstance.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  };

  const getProcessingOrders = async () => {
    try {
      const response = await axiosInstance.get("api/orders/processing");
      return response.data; // The API should return only orders with status "processing"
      // console.log("OrderContext : ", response.data);
    } catch (error) {
      console.error("Error fetching processing orders:", error);
      throw new Error("An error occurred while fetching processing orders.");
    }
  };

  const getwaitingForDeliveryOrders = async () => {
    try {
      const response = await axiosInstance.get("api/orders/preparedorders");
      return response.data; // The API should return only orders with status "processing"
    } catch (error) {
      console.error("Error fetching processing orders:", error);
      throw new Error("An error occurred while fetching processing orders.");
    }
  };

  const getOrderedStatusOrders = async () => {
    try {
      const response = await axiosInstance.get("/api/orders/ordered"); // Adjust API path as needed
      return response.data;
    } catch (error) {
      console.error("Error fetching 'Ordered' status orders:", error);
      throw error;
    }
  };

  const OrderContextValue = useMemo(
    () => ({
      getOrdersByRestaurant,
      updateOrderStatus,
      deleteOrder,
      assignedOrders,
      getProcessingOrders,
      getwaitingForDeliveryOrders,
      getOrderedStatusOrders,
    }),
    [assignedOrders]
  );

  return (
    <OrderContext.Provider value={OrderContextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
