import express from "express";
import {
  deliveredById,
  fetchallDeliveryUser,
  fetchEarning,
  getAssignedOrders,
  updateDeliveryDetails,
} from "../controllers/deliveryController.js";
import { loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authication.js";

const deliveryRouter = express.Router();

deliveryRouter.post("/register", registerUser);
deliveryRouter.post("/login", loginUser);
deliveryRouter.get("/earnings", authMiddleware, fetchEarning);
deliveryRouter.get("/list", authMiddleware, fetchallDeliveryUser);
deliveryRouter.post("/getAssignedOrders", authMiddleware, getAssignedOrders);
deliveryRouter.post("/updateDetails", authMiddleware, updateDeliveryDetails);

// Dummy handlers for testing
deliveryRouter.get("/dashboard/:userId", authMiddleware, (req, res) => {
  res.send(`Dashboard for userId: ${req.params.userId}`);
});

deliveryRouter.post("/dashboard/:userId/update", authMiddleware, (req, res) => {
  res.send(`Update dashboard for userId: ${req.params.userId}`);
});

deliveryRouter.get("/orders/delivered/:userId", authMiddleware, deliveredById);

export default deliveryRouter;
