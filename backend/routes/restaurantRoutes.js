import express from "express";
import {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  toggleRestaurantStatus,
  getRestaurentDetails,
  toggleRestaurantProfileStatus,
} from "../controllers/restaurantController.js";
import authMiddleware from "../middleware/authication.js";

const restaurentRouter = express.Router();

restaurentRouter.get("/list", authMiddleware, getAllRestaurants); // Fetch all restaurants
restaurentRouter.get("/details", authMiddleware, getRestaurentDetails);
restaurentRouter.get("/details/:id", authMiddleware, getRestaurantById); // Fetch a specific restaurant by ID
restaurentRouter.post("/createnew", authMiddleware, createRestaurant); // Create a new restaurant
restaurentRouter.put("/update", authMiddleware, updateRestaurant); // Update restaurant details
restaurentRouter.delete("/delete", authMiddleware, deleteRestaurant); // Delete a restaurant
restaurentRouter.patch(
  "/toggle-active-status",
  authMiddleware,
  toggleRestaurantStatus
); // Toggle active/inactive status
restaurentRouter.patch(
  "/toggle-profile-status",
  authMiddleware,
  toggleRestaurantProfileStatus
); // Toggle profile active/inactive status

export default restaurentRouter;
