import express from "express";
import authMiddleware from "../middleware/authication.js";
import {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  getOrderByRestaurant,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order.Controller.js";

const orderRoutes = express.Router();

// Create a new order
orderRoutes.post("/", authMiddleware, createOrder);

// Get all orders (admin use case)
orderRoutes.get("/", authMiddleware, getAllOrders);

// Get orders for a specific customer
orderRoutes.get("/customer/:customerId", authMiddleware, getOrdersByCustomer);

// Get orders for a specific restaurant
orderRoutes.get(
  "/restaurant/:restaurantId",
  authMiddleware,
  getOrderByRestaurant
);

// Get a specific order by ID
orderRoutes.get("/:orderId", authMiddleware, getOrderById);

// Update order status
orderRoutes.put("/:orderId/status", authMiddleware, updateOrderStatus);

// Delete an order (if allowed)
orderRoutes.delete("/:orderId", authMiddleware, deleteOrder);

export default orderRoutes;
