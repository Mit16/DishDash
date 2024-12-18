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
deliveryRouter.get(
  "/earnings",
  authMiddleware(["deliveryAgent"]),
  fetchEarning
);
deliveryRouter.get("/list", authMiddleware(["customer"]), fetchallDeliveryUser);
deliveryRouter.get(
  "/getAssignedOrders",
  authMiddleware(["deliveryAgent"]),
  getAssignedOrders
);
deliveryRouter.post(
  "/updateDetails",
  authMiddleware(["deliveryAgent"]),
  updateDeliveryDetails
);

// Dummy handlers for testing
deliveryRouter.get(
  "/dashboard/details",
  authMiddleware(["deliveryAgent"]),
  (req, res) => {
    res.send(`Dashboard for userId: ${req.params.userId}`);
  }
);

deliveryRouter.post(
  "/dashboard/dashboard",
  authMiddleware(["deliveryAgent"]),
  (req, res) => {
    res.send(`Update dashboard for userId: ${req.params.userId}`);
  }
);

deliveryRouter.get(
  "/orders/delivered/:userId",
  authMiddleware(["deliveryAgent"]),
  deliveredById
);

export default deliveryRouter;
