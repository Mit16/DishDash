import mongoose from "mongoose";
import restaurentModel from "../models/RestaurentModel.js";

// @desc Get all restaurants
// @route GET /api/restaurants
// @access Public
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurentModel.find();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching restaurants", error });
  }
};

// @desc Get a restaurant by ID
// @route GET /api/restaurants/:id
// @access Public
const getRestaurantById = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const restaurant = await restaurentModel.findById(id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching restaurant", error });
  }
};

// @desc Create a new restaurant
// @route POST /api/restaurants
// @access Private (Admins/Owners)
const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      ownerName,
      email,
      phone,
      address,
      cuisineTypes,
      deliveryRadius,
      openingHours,
      licenseNumber,
    } = req.body;

    const newRestaurant = new restaurentModel({
      name,
      ownerName,
      email,
      phone,
      address,
      cuisineTypes,
      deliveryRadius,
      openingHours,
      licenseNumber,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({ success: true, data: savedRestaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating restaurant", error });
  }
};

// @desc Update restaurant details
// @route PUT /api/restaurants/:id
// @access Private (Admins/Owners)
const updateRestaurant = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const updatedData = req.body;

    const updatedRestaurant = await restaurentModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: updatedRestaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating restaurant", error });
  }
};

// @desc Delete a restaurant
// @route DELETE /api/restaurants/:id
// @access Private (Admins/Owners)
const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const deletedRestaurant = await restaurentModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Restaurant deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting restaurant", error });
  }
};

// @desc Toggle restaurant active/inactive status
// @route PATCH /api/restaurants/:id/toggle-status
// @access Private (Admins/Owners)
const toggleRestaurantStatus = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const restaurant = await restaurentModel.findById(id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    restaurant.isActive = !restaurant.isActive;
    await restaurant.save();

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error toggling status", error });
  }
};

const toggleRestaurantProfileStatus = async (req, res) => {
  try {
    const id = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid restaurant ID" });
    }

    const restaurant = await restaurentModel.findById(id);

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    restaurant.profileCompleted = !restaurant.profileCompleted;
    await restaurant.save();

    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error toggling status", error });
  }
};

const getRestaurentDetails = async (req, res) => {
  try {
    // Query the database
    const user = await restaurentModel.findById(
      req.user._id,
      "_id fullname email accountType profileCompleted"
    );
    // console.log("Queried User:", user); // Debugging log

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in getRestaurentDetails:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user details", error });
  }
};

export {
  getAllRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  toggleRestaurantStatus,
  getRestaurentDetails,
  toggleRestaurantProfileStatus,
};
