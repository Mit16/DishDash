import DeliveryGuy from "../models/deliveryModel.js";
import orderModel from "../models/orderModel.js";

// Fetch total earnings for a delivery person
const fetchEarning = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authMiddleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }
    const deliveryGuy = await DeliveryGuy.findById(userId);

    if (!deliveryGuy) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery person not found" });
    }
    console.log("DeliveryGuy found:", deliveryGuy); // Debug log
    res
      .status(200)
      .json({ success: true, totalEarnings: deliveryGuy.totalEarnings });
  } catch (error) {
    console.error("Error fetching earnings:", error); // Improved error logging
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update delivery person details
const updateDeliveryDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from middleware
    const updateData = req.body.updateData; // Data from the frontend to be updated

    const deliveryGuy = await DeliveryGuy.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validation
      }
    );

    if (!deliveryGuy) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery person not found" });
    }

    res.status(200).json({
      success: true,
      message: "Delivery details updated successfully",
      data: deliveryGuy,
    });
  } catch (error) {
    console.error("Error updating delivery details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Fetch all delivery users
const fetchallDeliveryUser = async (req, res) => {
  try {
    const deliveryguy = await DeliveryGuy.find();
    res.status(200).json({ success: true, data: deliveryguy });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch" });
  }
};

// Get assigned orders for a delivery person
const getAssignedOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authMiddleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Find the delivery guy and populate assigned orders
    const deliveryBoy = await DeliveryGuy.findById(userId).populate({
      path: "ordersAssigned",
      // Fetch required fields
      select:
        "items customerDetails address orderStatus amount deliveryAmount payment createdAt",
    });

    if (!deliveryBoy || deliveryBoy.accountType !== "Delivery") {
      return res.status(404).json({
        success: false,
        message: "Delivery boy not found or invalid account type.",
      });
    }

    res.status(200).json({
      success: true,
      data: deliveryBoy.ordersAssigned,
    });
  } catch (error) {
    console.error("Error fetching assigned orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching assigned orders.",
    });
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Assume `req.user` contains the authenticated user's data
    const user = await UserModel.findById(userId); // Replace `UserModel` with your user schema

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the user has a deliveryId
    const details = {
      ...user.toObject(),
      hasDeliveryId: Boolean(user.deliveryId),
    };

    res.json({ success: true, data: details });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Fetch earning history for a delivery person
// const earningHistory = async (req, res) => {
//   try {
//     const deliveryGuyEarningRecord = await DeliveryGuy.findById(req.user._id); // Use `req.user._id`
//     if (!deliveryGuyEarningRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Unable to fetch earning record",
//       });
//     }
//     res.status(200).json({ success: true, data: deliveryGuyEarningRecord });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// Fetch all delivered orders
const deliveredOrders = async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized access" });
  }

  try {
    // Find the delivery guy and populate assigned orders
    const deliveryBoyOrders = await DeliveryGuy.findById(userId).populate({
      path: "ordersAssigned",
      // Fetch required fields
      select:
        "items customerDetails orderStatus amount deliveryAmount payment createdAt",
    });

    if (!deliveryBoyOrders) {
      return res.status(404).json({
        success: false,
        message: "Delivery person not found.",
      });
    }

    // Filter orders with status "Delivered"
    const orders = deliveryBoyOrders.ordersAssigned.filter(
      (order) => order.orderStatus === "Delivered"
    );

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No delivered orders found.",
      });
    }

    // Send filtered orders in response
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching delivered orders:", err);
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Update order status
    order.orderStatus = orderStatus;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchRecord = async (req, res) => {};

export {
  fetchEarning,
  deliveredOrders,
  fetchallDeliveryUser,
  getAssignedOrders,
  // earningHistory,
  updateDeliveryDetails,
  updateOrderStatus,
  fetchUserDetails,
};

// dailyEarnings: deliveryGuy.dailyEarnings,
// weeklyEarnings: deliveryGuy.weeklyEarnings,
// monthlyEarnings: deliveryGuy.monthlyEarnings,
