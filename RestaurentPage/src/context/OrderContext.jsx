import { createContext } from "react";
import { axiosInstance } from "./axiosConfig";

const OrderContext = createContext(null);

const OrderContextProvider = (props) => {
  // Create a new order
  const createOrder = async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create order"
      );
    }
  };

  // Get all orders (Admin use case)
  const getAllOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  };

  // Get orders for a specific customer
  const getOrdersByCustomer = async (customerId) => {
    try {
      const response = await axiosInstance.get(
        `/orders/customer/${customerId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch customer orders"
      );
    }
  };

  // Get orders for a specific restaurant
  const getOrdersByRestaurant = async (restaurantId) => {
    try {
      const response = await axiosInstance.get(
        `/orders/restaurant/${restaurantId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch restaurant orders"
      );
    }
  };

  // Get a specific order by ID
  const getOrderById = async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch order details"
      );
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update order status"
      );
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

  const OrderContextValue = {
    createOrder,
    getAllOrders,
    getOrdersByCustomer,
    getOrdersByRestaurant,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
  };

  return (
    <OrderContext.Provider value={OrderContextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
