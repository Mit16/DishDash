import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate input
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find user
    let userData = await userModel.findById(userId);

    // Handle missing user
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    // Update cart data
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Save the updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Validate input
    if (!userId || !itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find user
    let userData = await userModel.findById(userId);

    // Handle missing user
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is an object

    // Update cart data
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // Remove item from cart if quantity is 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    // Save the updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error: Unable to remove the cart item",
    });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Received userId:", userId); // Debugging
    // Validate input
    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find user
    let userData = await userModel.findById(userId);

    // Handle missing user
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData || {}; // Ensure cartData is an object

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get cart items" });
  }
};

export { addToCart, removeFromCart, getCart };
