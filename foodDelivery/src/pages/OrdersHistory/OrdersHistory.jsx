import React, { useEffect, useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";
import "./OrdersHistory.css";

const OrdersHistory = () => {
  const { orderHistory, fetchOrderHistory } = useContext(DeliveryContext);

  useEffect(() => {
    fetchOrderHistory(); // Fetch order history on component load
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found in history.</p>
      ) : (
        <ul className="order-history-list">
          {orderHistory.map((order) => (
            <li key={order.orderId} className="order-history-item">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersHistory;
