import DeliveryGuy from "../models/deliveryModel.js";
import orderModel from "../models/orderModel.js";

const fetchEarning = async (req, res) => {
  try {
    const deliveryGuy = await DeliveryGuy.findById(req.user.id); // Use valid `req.user.id`
    if (!deliveryGuy) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery person not found" });
    }
    res
      .status(200)
      .json({ success: true, totalEarnings: deliveryGuy.totalEarnings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateDeliveryDetails = async (req, res) => {
  try {
    const { userId } = req.body; // User ID from the token or frontend
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


const fetchallDeliveryUser = async (req, res) => {
  try {
    const deliveryguy = await DeliveryGuy.find();
    res.status(200).json({ success: true, data: deliveryguy });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch" });
  }
};

const getAssignedOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authMiddleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Find the delivery guy and populate assigned orders
    const deliveryBoy = await DeliveryGuy.findById(userId).populate({
      path: "ordersAssigned",
      select: "items customerDetails address orderStatus createdAt", // Fetch required fields
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

const earningHistory = async (req, res) => {
  try {
    const deliveryGuyEarningRecord = await DeliveryGuy.findById(req.user.id);
    if (!deliveryGuyEarningRecord) {
      res.status(400).json({ success: false, message: "Unable to fetch" });
    }
    res.status(200).json({ success: true, data: deliveryGuyEarningRecord });
  } catch (error) {
    res.json({ success: false, message: "Unable to process request" });
  }
};

const deliveredById = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await orderModel.find({
      orderStatus: "Delivered",
      userId: userId,
    });
    
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch orders" });
  }
};

const fetchRecord = async (req, res) => {};

export {
  fetchEarning,
  deliveredById,
  fetchallDeliveryUser,
  getAssignedOrders,
  earningHistory,
  updateDeliveryDetails,
};

// dailyEarnings: deliveryGuy.dailyEarnings,
// weeklyEarnings: deliveryGuy.weeklyEarnings,
// monthlyEarnings: deliveryGuy.monthlyEarnings,
