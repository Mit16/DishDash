import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import deliveryGuyModel from "../models/deliveryModel.js";

//Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.user._id,
      items: req.body.items,
      deliveryAmount: req.body.deliveryAmount,
      amount: req.body.amount,
      address: req.body.address,
      customerDetails: req.body.customerDetails,
      payment: true, // Automatically set payment to true
    });

    const savedOrder = await newOrder.save(); // Capture the saved order
    await userModel.findByIdAndUpdate(req.user._id, { cartData: {} });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId: savedOrder._id, // Use the correct variable here
    });
  } catch (error) {
    console.error("Error placing order:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error while placing order.",
    });
  }
};

const assignOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Fetch the order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // Fetch all delivery boys
    const deliveryBoys = await deliveryGuyModel.find({
      accountType: "Delivery",
    });
    if (!deliveryBoys.length) {
      return res
        .status(404)
        .json({ success: false, message: "No delivery boys available." });
    }

    // Randomly assign a delivery boy
    const assignedDeliveryBoy =
      deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];

    // Update the order with the assigned delivery boy details
    await orderModel.findByIdAndUpdate(orderId, {
      status: "Assigned",
      deliveryBoy: {
        name: `${assignedDeliveryBoy.fullname.firstname} ${assignedDeliveryBoy.fullname.lastname}`,
        phone: assignedDeliveryBoy.phoneNumber,
        id: assignedDeliveryBoy._id,
      },
    });

    // Update the delivery boy's assigned orders
    await deliveryGuyModel.findByIdAndUpdate(
      assignedDeliveryBoy._id,
      { $push: { ordersAssigned: orderId } },
      { new: true } // Ensure the updated document is returned
    );

    res.json({
      success: true,
      message: "Order assigned successfully.",
      deliveryBoy: assignedDeliveryBoy,
    });
  } catch (error) {
    console.error("Error in assignOrder:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error while assigning order.",
    });
  }
};

//users order for frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Extract userId from middleware
    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Unable to fetch orders:", error);
    res.json({ success: false, message: "Error" });
  }
};

//listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//api for updating order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      orderStatus: req.body.orderStatus,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus, assignOrder };
