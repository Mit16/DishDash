import React, { useState, useEffect } from "react";
import "./DeliveredOrders.css";
import { useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";

const DeliveredOrders = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const { fetchDeliveredOrders } = useContext(DeliveryContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchDeliveredOrders();
        // Keep only the top 5 orders
        setDeliveredOrders(response.slice(0, 5));
      } catch (error) {
        console.error("Error fetching delivered orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="delivered-orders-container">
      <h2>Delivered Orders</h2>
      {deliveredOrders.length === 0 ? (
        <p>No delivered orders found.</p>
      ) : (
        <ul className="orders-list">
          {deliveredOrders.map((order) => (
            <li key={order.orderId} className="order-item">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Delivery Address:</strong> {order.address.street},{" "}
                {order.address.city}, {order.address.state} -{" "}
                {order.address.zipcode}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{order.amount}
              </p>
              <p>
                <strong>Delivery Fee:</strong> ₹{order.deliveryAmount}
              </p>
              <p>
                <strong>Delivered At:</strong>{" "}
                {new Date(order.deliveredAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeliveredOrders;
