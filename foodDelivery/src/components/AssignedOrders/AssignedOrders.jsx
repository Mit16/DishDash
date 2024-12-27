import React, { useContext, useState, useEffect } from "react";
import "./AssignedOrder.css";
import { DeliveryContext } from "../../context/Delivery.context";

const AssignedOrders = () => {
  const { assignedOrders, updateOrderStatus } = useContext(DeliveryContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Filter orders with status "waiting for delivery boy"
    const filteredOrders = assignedOrders.filter(
      (order) => order.orderStatus === "waiting for delivery boy"
    );
    setOrders(filteredOrders);
  }, [assignedOrders]);

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

  console.log("Assigned Order 40 : ", orders);

  return (
    <div className="assigned-orders-container">
      <h2>Assigned Orders</h2>
      {orders.length === 0 ? (
        <p>No assigned orders available.</p>
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
                <strong>Order Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Items:</strong>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} (x{item.quantity}) - ₹{item.price}
                      {item.restaurant ? (
                        <div className="restaurant-info">
                          <strong>From:</strong>{" "}
                          {item.restaurant.restaurentName ||
                            "Restaurant Name Missing"}{" "}
                          | {item.restaurant.phone || "Phone Missing"}
                          <br />
                          <strong>Address:</strong>{" "}
                          {`${item.restaurant.address?.street || ""}, ${
                            item.restaurant.address?.city || ""
                          }, ${item.restaurant.address?.state || ""} - ${
                            item.restaurant.address?.zipcode || ""
                          }`}
                        </div>
                      ) : (
                        <p>Restaurant information not available.</p>
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
                  className="status-btn out-delivery-btn"
                  onClick={() =>
                    handleUpdateStatus(order.orderId, "Out for delivery")
                  }
                >
                  Out for Delivery
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

export default AssignedOrders;
