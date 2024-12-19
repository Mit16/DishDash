import express from "express";
import {
  deliveredOrders,
  fetchallDeliveryUser,
  fetchEarning,
  getAssignedOrders,
  updateDeliveryDetails,
  updateOrderStatus,
  fetchUserDetails,
} from "../controllers/deliveryController.js";
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authication.js";

const deliveryRouter = express.Router();

deliveryRouter.post("/register", registerUser);
deliveryRouter.post("/login", loginUser);
deliveryRouter.get("/earnings", authMiddleware, fetchEarning);
deliveryRouter.get("/list", authMiddleware, fetchallDeliveryUser);
deliveryRouter.get("/getAssignedOrders", authMiddleware, getAssignedOrders);
deliveryRouter.post("/updateDetails", authMiddleware, updateDeliveryDetails);
deliveryRouter.post("/status", authMiddleware, updateOrderStatus);

deliveryRouter.get("/dashboard/details", authMiddleware, fetchUserDetails);

deliveryRouter.get("/orders/delivered", authMiddleware, deliveredOrders);

export default deliveryRouter;
