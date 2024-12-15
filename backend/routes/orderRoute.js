import express from "express";
import authMiddleware from "../middleware/authication.js";
import {
  placeOrder,
  userOrders,
  listOrders,
  updateStatus,
  assignOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.post("/assignOrder", authMiddleware, assignOrder);

export default orderRouter;
