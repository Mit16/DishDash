import menuModel from "../models/MenuModel.js";
import mongoose from "mongoose";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Image storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "menuUploads", // Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed file formats
  },
});

const upload = multer({ storage }).any(); // Allow any file field

// Add a new dish to the menu
const addMenuItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Image upload failed", err });
    }

    const { categoryName, dishes } = req.body;

    try {
      const restaurantId = req.user._id; // Extract restaurant ID from auth middleware
      const parsedDishes = JSON.parse(dishes); // Parse JSON string from formData

      // Map uploaded files to their respective dishes
      const dishImages = {};
      req.files.forEach((file) => {
        const match = file.fieldname.match(/dishes\[(\d+)]\[image]/); // Extract index from fieldname
        if (match) {
          const index = parseInt(match[1], 10);
          dishImages[index] = file.path; // Cloudinary file URL
        }
      });

      // Attach images to their corresponding dishes
      const newDishes = parsedDishes.map((dish, index) => ({
        ...dish,
        image: dishImages[index] || "", // Use image URL or leave it empty
      }));

      // Check if the menu already exists for the restaurant
      let menu = await menuModel.findOne({ restaurantId, categoryName });

      if (menu) {
        // Add the new dishes to the existing menu
        menu.dishes.push(...newDishes);
      } else {
        // Create a new menu
        menu = new menuModel({
          restaurantId,
          categoryName,
          dishes: newDishes,
        });
      }

      await menu.save();
      res.status(201).json({ success: true, data: menu });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error adding menu item", error });
    }
  });
};

// Get all menu items
// Get all menu items with categories and dishes
const getAllMenuItems = async (req, res) => {
  try {
    // Fetch all menu items and populate restaurant details
    const menuItems = await menuModel
      .find()
      .populate("restaurantId", "fullname phone email");

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found",
      });
    }

    // Transform the data to return categories and their dishes
    const formattedMenu = menuItems.map((item) => ({
      categoryName: item.categoryName,
      dishes: item.dishes,
      restaurant: {
        id: item.restaurantId._id,
        name: `${item.restaurantId.fullname.firstname.trim()} ${item.restaurantId.fullname.lastname.trim()}`,
        phone: item.restaurantId.phone,
        email: item.restaurantId.email,
      },
    }));

    res.status(200).json({ success: true, data: formattedMenu });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching menu items", error });
  }
};

// Get menu items by restaurant ID
const getMenuItemsByRestaurant = async (req, res) => {
  try {
    // Use restaurant ID from the auth middleware
    const restaurantId = req.user._id;

    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    // Fetch menu items for the restaurant
    const menuItems = await menuModel.find({ restaurantId });
    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No menu items found for this restaurant",
      });
    }
    // Return the menu items
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching menu items for restaurant",
      error,
    });
  }
};

// Get a single menu item by ID
const getMenuItemById = async (req, res) => {
  const { menuItemId } = req.params;

  // Validate menu item ID
  if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid menu item ID" });
  }

  try {
    const menuItem = await menuModel.findById(menuItemId);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching menu item", error });
  }
};

// Update a menu item by ID
const updateMenuItem = async (req, res) => {
  const { menuItemId } = req.params;

  // Validate menu item ID
  if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid menu item ID" });
  }

  try {
    const updatedMenuItem = await menuModel.findByIdAndUpdate(
      menuItemId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMenuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    res.status(200).json({ success: true, data: updatedMenuItem });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating menu item", error });
  }
};

// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
  const { menuItemId } = req.params;

  // Validate menu item ID
  if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid menu item ID" });
  }

  try {
    // Find the menu containing the dish
    const menu = await menuModel.findOne({ "dishes._id": menuItemId });

    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Locate the specific dish to delete
    const dish = menu.dishes.id(menuItemId);

    if (!dish) {
      return res
        .status(404)
        .json({ success: false, message: "Dish not found in menu" });
    }

    // Extract the public ID from the Cloudinary URL
    const imageUrl = dish.image;
    const publicIdMatch = imageUrl.match(/menuUploads\/([^/]+)\.[\w]+$/);

    if (publicIdMatch && publicIdMatch[1]) {
      const publicId = `menuUploads/${publicIdMatch[1]}`;

      // Delete the image from Cloudinary using the Promise-based API
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary image deleted:", result);
      } catch (cloudinaryError) {
        console.error("Cloudinary image deletion failed:", cloudinaryError);
        // Continue deleting the dish even if the image deletion fails
      }
    }

    // Remove the dish from the menu's dishes array
    menu.dishes.pull(menuItemId);

    // Save the updated menu document
    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu item and image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting menu item:", error); // Add error logging
    res.status(500).json({ success: false, message: "Error deleting menu item", error });
  }
};


const toggleAvailability = async (req, res) => {
  try {
    const dishId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(dishId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid dish ID" });
    }

    // Find the dish by its ID in the menu collection
    const menu = await menuModel.findOne({ "dishes._id": dishId });

    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "Dish not found" });
    }

    // Locate the specific dish and toggle its availability
    const dish = menu.dishes.id(dishId);
    dish.availability = !dish.availability;

    // Save the updated menu
    await menu.save();

    res.status(200).json({ success: true, data: dish });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error toggling status", error });
  }
};

// const createOrUpdateCategory = async (req, res) => {
//   try {
//     const restaurantId = req.user._id;
//     const { categoryName } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid restaurant ID" });
//     }

//     // Normalize category name (e.g., lowercase)
//     const normalizedCategoryName = categoryName.trim().toLowerCase();

//     // Check if the category already exists
//     const existingCategory = await menuModel.findOne({
//       restaurantId,
//       categoryName: normalizedCategoryName,
//     });

//     if (existingCategory) {
//       return res
//         .status(409)
//         .json({ success: false, message: "Category already exists" });
//     }

//     // Create a new category if it doesn't exist
//     const newCategory = new menuModel({
//       restaurantId,
//       categoryName: normalizedCategoryName,
//       dishes: [],
//     });

//     await newCategory.save();

//     res.status(201).json({ success: true, data: newCategory });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error creating category", error });
//   }
// };

export {
  getAllMenuItems,
  getMenuItemsByRestaurant,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  addMenuItem,
  toggleAvailability,
  // createOrUpdateCategory,
};
