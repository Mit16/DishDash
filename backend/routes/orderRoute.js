import express from "express";
import authMiddleware from "../middleware/authication.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateOrderStatus,
  assignOrder,
  getOrderByRestaurant,
  getProcessingOrders,
  getWaitingForDeliveryOrders,
} from "../controllers/orderController.js";
import validateOrder from "../validators/orderValidator.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, validateOrder, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", authMiddleware, updateOrderStatus);
orderRouter.post("/assignorder", authMiddleware, assignOrder);
// Get orders for a specific restaurant
orderRouter.get("/restaurant-orders", authMiddleware, getOrderByRestaurant);
orderRouter.get("/processing", authMiddleware, getProcessingOrders);

orderRouter.get("/preparedorders", authMiddleware, getWaitingForDeliveryOrders);

export default orderRouter;
