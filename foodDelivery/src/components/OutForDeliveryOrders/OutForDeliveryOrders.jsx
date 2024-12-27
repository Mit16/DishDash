import React, { useState, useEffect, useContext } from "react";
import { axiosInstance } from "../../context/axiosConfig";
import "./OutForDeliveryOrders.css";
import { DeliveryContext } from "../../context/Delivery.context";

const OutForDeliveryOrders = () => {
  const { markOrderAsDelivered, updateOrderStatus } =
    useContext(DeliveryContext);
  const [orders, setOrders] = useState([]);

  // Fetch out-for-delivery orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/delivery/outfordelivery"
        );
        setOrders(response.data.data); // Assuming data contains an array of orders
      } catch (error) {
        console.error("Error fetching 'Out for delivery' orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Mark order as delivered
  const handleDelivered = async (orderId) => {
    try {
      const success = await markOrderAsDelivered(orderId);

      if (success) {
        // Update the local state to reflect the order is delivered
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.orderId !== orderId)
        );
        alert("Order marked as delivered!");
      } else {
        alert("Failed to mark the order as delivered.");
      }
    } catch (error) {
      alert("An error occurred while marking the order as delivered.");
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      if (response.success) {
        alert(`Order status updated to "${newStatus}"`);
        // Update the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId
              ? { ...order, orderStatus: newStatus }
              : order
          )
        );
      } else {
        alert(`Failed to update status: ${response.message}`);
      }
    } catch (error) {
      alert("An error occurred while updating the order status.");
    }
  };

  return (
    <div className="out-for-delivery-orders">
      <h2>Out for Delivery Orders</h2>
      {orders.length === 0 ? (
        <p>No orders are currently out for delivery.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.orderId} className="order-item">
              <h4>Order ID: {order.orderId}</h4>
              <p>
                <strong>Address:</strong>{" "}
                {`${order.customerAddress.street}, ${order.customerAddress.city}, ${order.customerAddress.state} - ${order.customerAddress.zipcode}`}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {order.payment ? "Paid" : "Pending"}
              </p>
              <p>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) - ₹{item.price}
                      {item.restaurant && (
                        <div className="restaurant-info">
                          <strong>From:</strong>{" "}
                          {item.restaurant.restaurentName} |{" "}
                          {item.restaurant.phone}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.amount}
              </p>
              <p>
                <strong>Delivery Fee:</strong> ₹{order.deliveryAmount}
              </p>
              <div className="order-actions">
                <button
                  className="status-btn delivered-btn"
                  onClick={() => handleDelivered(order.orderId)}
                >
                  Delivered
                </button>
                <button
                  className="status-btn cancel-btn"
                  onClick={() =>
                    handleUpdateStatus(
                      order.orderId,
                      "Cancelled by delivery boy"
                    )
                  }
                >
                  Cancel Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OutForDeliveryOrders;
