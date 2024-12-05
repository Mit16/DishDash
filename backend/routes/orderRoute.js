import express from "express";
import authMiddleware from "../middleware/authication.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
