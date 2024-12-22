import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from middleware
    const { itemId } = req.body;

    // Validate input
    if (!itemId) {
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

    // cartData[itemId] = (cartData[itemId] || 0) + 1; // Increment item count

    // // Save updated cart
    // userData.cartData = cartData;
    // await userData.save();

    // return res.json({ success: true, message: "Item added to cart", cartData });

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

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from middleware
    const { itemId } = req.body;

    // Validate input
    if (!itemId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find user
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Ensure cartData exists
    const cartData = userData.cartData || {};

    // Update cart data
    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      // Remove item if quantity reaches 0
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item not in cart" });
    }

    // Save updated cart
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({
      success: false,
      message: "Server error: Unable to remove the cart item",
    });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from middleware

    // Find user
    let userData = await userModel.findById(userId);

    // Handle missing user
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = (await userData.cartData) || {}; // Ensure cartData is an object

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get cart items" });
  }
};

export { addToCart, removeFromCart, getCart };
