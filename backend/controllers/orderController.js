import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import deliveryGuyModel from "../models/deliveryModel.js";
import restaurentModel from "../models/RestaurentModel.js";
import mongoose from "mongoose";

//Placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    const { items, deliveryAmount, amount, address, paymentMethod } = req.body;

    // Create new order
    const newOrder = new orderModel({
      userId: req.user._id,
      items,
      deliveryAmount,
      amount,
      address,
      paymentMethod, // Default to "Online" if not provided
      payment: true,
    });

    // console.log("orderController 60", newOrder);
    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Assign order to restaurants
    await assignOrdersToRestaurants(items, savedOrder._id);

    // Clear user cart after order placement
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while placing order.",
    });
  }
};

const assignOrdersToRestaurants = async (orderItems, orderId) => {
  try {
    const groupedOrders = orderItems.reduce((acc, item) => {
      const { restaurantId } = item;
      if (!restaurantId) {
        console.error("Missing restaurantId for item:", item);
      }
      if (!acc[restaurantId]) {
        acc[restaurantId] = [];
      }
      acc[restaurantId].push(item);
      return acc;
    }, {});

    for (const restaurantId in groupedOrders) {
      await restaurentModel.findByIdAndUpdate(
        restaurantId,
        {
          $push: {
            ordersAssigned: {
              orderId: orderId,
              items: groupedOrders[restaurantId],
            },
          },
        },
        { new: true }
      );
    }

    // console.log("Orders successfully assigned to restaurants.");
  } catch (error) {
    console.error("Error assigning orders to restaurants:", error);
    throw new Error("Failed to assign orders to restaurants.");
  }
};

const assignOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    const deliveryBoys = await deliveryGuyModel.find({
      accountType: "Delivery",
    });
    if (!deliveryBoys.length) {
      return res
        .status(404)
        .json({ success: false, message: "No delivery boys available." });
    }

    const assignedDeliveryBoy =
      deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];

    order.deliveryPartnerId = assignedDeliveryBoy._id;
    await order.save();

    await deliveryGuyModel.findByIdAndUpdate(
      assignedDeliveryBoy._id,
      { $push: { ordersAssigned: orderId } },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order assigned successfully.",
      deliveryBoy: assignedDeliveryBoy,
    });
  } catch (error) {
    console.error("Error in assignOrder:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while assigning order.",
    });
  }
};

//users order for frontend
const userOrders = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found.",
      });
    }

    const orders = await orderModel
      .find({ userId: req.user._id })
      .populate("items.restaurantId", "name address")
      .populate("items.dishId", "name price image")
      .populate("deliveryPartnerId", "fullname email");

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Unable to fetch orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching orders.",
    });
  }
};

//listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ orderDate: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching orders.",
    });
  }
};

//api for updating order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    console.log("Incoming Request: ", { orderId, orderStatus });

    const order = await orderModel.findById(orderId);
    if (!order) {
      console.log("Order not found for ID: ", orderId);
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    order.orderStatus = orderStatus;
    await order.save();

    console.log("Order status updated successfully for ID: ", orderId);
    res.json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating order status.",
    });
  }
};

// Get orders for a specific restaurant
const getOrderByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.user?._id; // Assuming restaurant ID comes from authenticated user

    if (!restaurantId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const restaurant = await restaurentModel
      .findById(restaurantId, "ordersAssigned")
      .populate("ordersAssigned.orderId", "paymentMethod orderStatus createdAt")
      .populate("ordersAssigned.items.itemId", "name price");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ success: true, data: restaurant.ordersAssigned });
  } catch (error) {
    console.error("Error fetching restaurant orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProcessingOrders = async (req, res) => {
  try {
    const restaurantId = req.user?._id; // Assuming restaurant ID comes from authenticated user

    if (!restaurantId) {
      return res
        .status(400)
        .json({ success: false, message: "Restaurant ID is required" });
    }

    // Fetch orders assigned to the restaurant where the status is "processing"
    const restaurant = await restaurentModel
      .findById(restaurantId, "ordersAssigned")
      .populate({
        path: "ordersAssigned.orderId",
        match: { orderStatus: "processing" }, // Filter only "processing" orders
        select:
          "userId items amount payment paymentMethod orderStatus createdAt",
      })
      .populate("ordersAssigned.items.itemId", "name price"); // Include item details

    if (!restaurant || !restaurant.ordersAssigned.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this restaurant.",
      });
    }

    const processingOrders = restaurant.ordersAssigned.filter(
      (order) => order.orderId && order.orderId.orderStatus === "processing"
    );

    res.status(200).json({ success: true, data: processingOrders });
  } catch (error) {
    console.error("Error fetching processing orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch processing orders." });
  }
};

const getWaitingForDeliveryOrders = async (req, res) => {
  try {
    const restaurantId = req.user?._id; // Assuming restaurant ID comes from authenticated user

    if (!restaurantId) {
      return res
        .status(400)
        .json({ success: false, message: "Restaurant ID is required" });
    }

    // Fetch orders assigned to the restaurant
    const restaurant = await restaurentModel
      .findById(restaurantId, "ordersAssigned")
      .populate({
        path: "ordersAssigned.orderId",
        match: { orderStatus: "waiting for delivery boy" }, // Filter orders
        populate: {
          path: "deliveryPartnerId", // Populate delivery partner details
          select: "fullname phoneNumber",
        },
        select: "items orderStatus",
      })
      .populate({
        path: "ordersAssigned.items.itemId", // Populate items
        model: "Menu", // Ensure the model is explicitly defined
        select: "name", // Select only the 'name' field from the Menu schema
      });

    if (!restaurant || !restaurant.ordersAssigned.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this restaurant.",
      });
    }

    // Filter and format the data
    const formattedOrders = restaurant.ordersAssigned
      .filter(
        (order) =>
          order.orderId &&
          order.orderId.orderStatus === "waiting for delivery boy"
      )
      .map((order) => ({
        orderId: order.orderId._id,
        items: order.items.map((item) => ({
          name: item.itemId?.name || "Unknown Item", // Default to "Unknown Item" if undefined
          quantity: item.quantity || 1,
        })),
        deliveryPartner: {
          fullname:
            `${order.orderId.deliveryPartnerId?.fullname.firstname || ""} ${
              order.orderId.deliveryPartnerId?.fullname.lastname || ""
            }`.trim() || "Not Assigned",
          phoneNumber:
            order.orderId.deliveryPartnerId?.phoneNumber || "Not Assigned",
        },
      }));

    res.status(200).json({ success: true, data: formattedOrders });
  } catch (error) {
    console.error("Error fetching waiting for delivery orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

export {
  placeOrder,
  userOrders,
  listOrders,
  updateOrderStatus,
  assignOrder,
  getOrderByRestaurant,
  getProcessingOrders,
  getWaitingForDeliveryOrders,
};
