// import { body, validationResult } from "express";
import mongoose from "mongoose";

const validateOrder = (req, res, next) => {
  const { paymentMethod, address, items } = req.body;

  // Check for payment method
  if (!paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "Missing required field: paymentMethod",
    });
  }

  // Validate address fields
  if (
    !address ||
    !address.street ||
    !address.city ||
    !address.state ||
    !address.zipcode
  ) {
    return res.status(400).json({
      success: false,
      message: "Incomplete address provided.",
    });
  }

  // Validate items array
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Items array is empty or invalid.",
    });
  }

  const hasInvalidFields = items.some(
    (item) =>
      !item.itemId ||
      !item.name ||
      typeof item.price !== "number" ||
      typeof item.quantity !== "number" ||
      !item.restaurantId ||
      !mongoose.Types.ObjectId.isValid(item.restaurantId) // Ensure it's a valid ObjectId
  );

  if (hasInvalidFields) {
    return res.status(400).json({
      success: false,
      message: "Invalid item data in order items.",
    });
  }

  next();
};

export default validateOrder;
