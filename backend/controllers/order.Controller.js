import orderModel from "../models/orderModel.js";
import menuModel from "../models/MenuModel.js";
import restaurentModel from "../models/RestaurentModel.js";
// Create a new order
const createOrder = async (req, res) => {
  try {
    const { customerId, restaurantId, dishes, deliveryAddress } = req.body;

    // Validate restaurant and menu items
    const restaurant = await restaurentModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    let totalPrice = 0;
    for (const dish of dishes) {
      const menu = await menuModel.findOne({
        _id: restaurantId,
        "dishes._id": dish.dishId,
      });
      if (!menu) {
        return res
          .status(404)
          .json({ message: "Dish not found in the restaurant menu" });
      }
      const selectedDish = menu.dishes.id(dish.dishId);
      totalPrice += selectedDish.price * dish.quantity;
    }

    const newOrder = new Order({
      customerId,
      restaurantId,
      dishes,
      totalPrice,
      deliveryAddress,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all orders (admin use case)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("customerId", "name email")
      .populate("restaurantId", "name")
      .populate("dishes.dishId", "name price");
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get orders for a specific customer
const getOrdersByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await orderModel
      .find({ customerId })
      .populate("restaurantId", "name")
      .populate("dishes.dishId", "name price");
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get orders for a specific restaurant
const getOrderByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await orderModel
      .find({ restaurantId })
      .populate("customerId", "name email")
      .populate("dishes.dishId", "name price");
    res.status(200).json({ data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a specific order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel
      .findById(orderId)
      .populate("customerId", "name email")
      .populate("restaurantId", "name")
      .populate("dishes.dishId", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order (if allowed)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  getOrderByRestaurant,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
