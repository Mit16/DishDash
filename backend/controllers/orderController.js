import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import deliveryGuyModel from "../models/deliveryModel.js";

//Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      deliveryAmount: req.body.deliveryAmount,
      amount: req.body.amount,
      address: req.body.address,
      payment: true, // Automatically set payment to true
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while placing the order." });
  }
};

const assignOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Fetch all delivery boys
    const deliveryBoys = await deliveryGuyModel.find({
      accountType: "Delivery",
    });

    if (deliveryBoys.length === 0) {
      return res.json({
        success: false,
        message: "No delivery boys available.",
      });
    }

    // Randomly select a delivery boy
    const assignedDeliveryBoy =
      deliveryBoys[Math.floor(Math.random() * deliveryBoys.length)];

    // Update the order status and assigned delivery boy details
    await orderModel.findByIdAndUpdate(orderId, {
      status: "Assigned",
      deliveryBoy: {
        name: `${assignedDeliveryBoy.fullname.firstname} ${assignedDeliveryBoy.fullname.lastname}`,
        phone: assignedDeliveryBoy.phoneNumber,
        id: assignedDeliveryBoy._id,
      },
    });

    // Add the order to the delivery boy's assigned orders
    await userModel.findByIdAndUpdate(assignedDeliveryBoy._id, {
      $push: { ordersAssigned: orderId },
    });

    res.json({
      success: true,
      message: "Order assigned successfully.",
      deliveryBoy: assignedDeliveryBoy,
    });
  } catch (error) {
    console.error("Error assigning order:", error);
    res.json({ success: false, message: "Error assigning order." });
  }
};

//users order for frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
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
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus, assignOrder };
