import express from "express";
import {
  getAllMenuItems,
  getMenuItemsByRestaurant,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
  // createOrUpdateCategory,
} from "../controllers/menuController.js";
import authMiddleware from "../middleware/authication.js";

const menuRouter = express.Router();

menuRouter.get("/list", getAllMenuItems); // Get all menu items;
menuRouter.get("/itemlist", authMiddleware, getMenuItemsByRestaurant); // Get menu items by restaurant;
menuRouter.get("/item/:menuItemId", authMiddleware, getMenuItemById); // Get a single menu item by ID;
menuRouter.post("/add", authMiddleware, addMenuItem); // Create a new menu item;
menuRouter.put("/:menuItemId", authMiddleware, updateMenuItem); // Update a menu item by ID;
menuRouter.delete("/delete/:menuItemId", authMiddleware, deleteMenuItem); // Delete a menu item by ID;
menuRouter.patch(
  "/dishes/:id/toggle-availability",
  authMiddleware,
  toggleAvailability
);
// menuRouter.post("/categories", authMiddleware, createOrUpdateCategory);

export default menuRouter;
