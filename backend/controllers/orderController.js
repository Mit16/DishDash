import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import deliveryGuyModel from "../models/deliveryModel.js";
import mongoose from "mongoose";

//Placing user order from frontend
const placeOrder = async (req, res) => {
  try {
    // console.log("Request body:", req.body);
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
const updateStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating order status.",
    });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus, assignOrder };
