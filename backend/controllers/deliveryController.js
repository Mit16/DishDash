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
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const orders = await orderModel
      .find({
        deliveryPartnerId: userId,
        orderStatus: "waiting for delivery boy",
      })
      .populate({
        path: "items.restaurantId",
        model: "Restaurant",
        select: "restaurentName phone address",
      })
      .select(
        "items address orderStatus amount deliveryAmount paymentMethod createdAt"
      );

    // console.log("Raw Orders:", orders); // Log raw data

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found with the status 'waiting for delivery boy'.",
      });
    }

    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      customerAddress: order.address,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      deliveryAmount: order.deliveryAmount,
      amount: order.amount,
      items: order.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurant: item.restaurantId
          ? {
              restaurentName: item.restaurantId.restaurentName,
              phone: item.restaurantId.phone,
              address: item.restaurantId.address,
            }
          : null,
      })),
    }));

    // console.log("Formatted Orders:", formattedOrders); // Log formatted data

    res.status(200).json({
      success: true,
      data: formattedOrders,
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
    // Fetch only the delivered orders directly using a query
    const deliveryBoy = await DeliveryGuy.findById(userId).populate({
      path: "ordersAssigned",
      match: { orderStatus: "Delivered" }, // Fetch only delivered orders
      select: "address amount deliveryAmount createdAt", // Select only required fields
    });

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery person not found.",
      });
    }

    const deliveredOrders = deliveryBoy.ordersAssigned;

    if (!deliveredOrders || deliveredOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No delivered orders found.",
      });
    }

    // Format the response to only include essential details
    const formattedOrders = deliveredOrders.map((order) => ({
      orderId: order._id,
      address: order.address,
      amount: order.amount,
      deliveryAmount: order.deliveryAmount,
      deliveredAt: order.createdAt,
    }));

    res.status(200).json({ success: true, orders: formattedOrders });
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

const getOutForDeliveryOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const orders = await orderModel
      .find({
        deliveryPartnerId: userId,
        orderStatus: "Out for delivery",
      })
      .populate({
        path: "items.restaurantId",
        model: "Restaurant",
        select: "restaurentName phone", // Only fetch restaurant name and phone
      })
      .select(
        "items address orderStatus amount deliveryAmount paymentMethod payment createdAt"
      ); // Include 'payment' field

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found with the status 'Out for delivery'.",
      });
    }

    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      customerAddress: order.address,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
      payment: order.payment, // Include payment status
      createdAt: order.createdAt,
      deliveryAmount: order.deliveryAmount,
      amount: order.amount,
      items: order.items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurant: item.restaurantId
          ? {
              restaurentName: item.restaurantId.restaurentName,
              phone: item.restaurantId.phone,
            }
          : null,
      })),
    }));

    res.status(200).json({
      success: true,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching 'Out for delivery' orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching 'Out for delivery' orders.",
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Fetch all orders assigned to the delivery partner
    const orders = await orderModel
      .find({ deliveryPartnerId: userId })
      .select("orderStatus amount createdAt");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No order history found for this delivery partner.",
      });
    }

    // Format the data
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      orderStatus: order.orderStatus,
      amount: order.amount,
      createdAt: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order history.",
    });
  }
};

const getDeliveryGuyDetails = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID comes from the auth middleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    const deliveryGuy = await DeliveryGuy.findById(userId).select(
      "fullname accountType email phoneNumber dateOfBirth gender street city state zipcode vehicleType vehicleNumber totalEarnings deliveryArea profileCompleted"
    );

    if (!deliveryGuy) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery person not found" });
    }

    res.status(200).json({ success: true, data: deliveryGuy });
  } catch (error) {
    console.error("Error fetching delivery guy details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching delivery guy details" });
  }
};

const getDeliveredOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Fetch orders with "Delivered" status
    const orders = await orderModel
      .find({ deliveryPartnerId: userId, orderStatus: "Delivered" })
      .select("orderStatus amount createdAt");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No delivered orders found for this delivery partner.",
      });
    }

    // Format the response
    const formattedOrders = orders.map((order) => ({
      orderId: order._id,
      orderStatus: order.orderStatus,
      amount: order.amount,
      createdAt: order.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching delivered orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching delivered orders.",
    });
  }
};

const markOrderAsDelivered = async (req, res) => {
  try {
    const { orderId } = req.params; // Get the order ID from the request
    const userId = req.user._id; // Get the delivery boy's ID from auth middleware

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Find the order
    const order = await orderModel.findOne({
      _id: orderId,
      deliveryPartnerId: userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or not assigned to this delivery partner.",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Order is already marked as delivered.",
      });
    }

    // Update order status
    order.orderStatus = "Delivered";
    await order.save();

    // Add delivery amount to the delivery boy's total earnings
    const deliveryAmount = order.deliveryAmount || 0; // Ensure deliveryAmount is defined

    const deliveryBoy = await DeliveryGuy.findById(userId);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery person not found.",
      });
    }

    deliveryBoy.totalEarnings += deliveryAmount;
    await deliveryBoy.save();

    res.status(200).json({
      success: true,
      message: "Order marked as delivered, and earnings updated successfully.",
    });
  } catch (error) {
    console.error("Error marking order as delivered:", error);
    res.status(500).json({
      success: false,
      message: "Error marking order as delivered.",
    });
  }
};

export {
  fetchEarning,
  deliveredOrders,
  fetchallDeliveryUser,
  getAssignedOrders,
  // earningHistory,
  updateDeliveryDetails,
  updateOrderStatus,
  fetchUserDetails,
  getOutForDeliveryOrders,
  getOrderHistory,
  getDeliveryGuyDetails,
  getDeliveredOrders,
  markOrderAsDelivered,
};

// dailyEarnings: deliveryGuy.dailyEarnings,
// weeklyEarnings: deliveryGuy.weeklyEarnings,
// monthlyEarnings: deliveryGuy.monthlyEarnings,
