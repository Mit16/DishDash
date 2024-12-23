import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import "./RestaurantOrders.css";

const RestaurantOrders = () => {
  const { getOrdersByRestaurant, updateOrderStatus } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByRestaurant();
        setOrders(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "processing");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "cancelled by restaurant");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  const renderTimer = (createdAt) => {
    const timeLeft = Math.max(
      0,
      15 * 60 * 1000 - (Date.now() - new Date(createdAt).getTime())
    );
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => {
          const timeLeft = Date.now() - new Date(order.createdAt).getTime();
          if (timeLeft >= 15 * 60 * 1000) {
            handleReject(order._id); // Auto-reject after 15 minutes
            return false;
          }
          return true;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="restaurant-orders">
      <h2>Assigned Orders</h2>
      {orders.map((order) => {
        if (!order._id) {
          console.warn(`Missing orderId for order: ${order._id}`);
          return null; // Skip rendering if _id is missing
        }

        const totalPrice = order.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>
              <strong>Timer:</strong> {renderTimer(order.createdAt)}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
            </p>
            <p>
              <strong>Ordered At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.itemId}>
                  {item.name} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={() => handleAccept(order._id)}>Accept</button>
            <button onClick={() => handleReject(order._id)}>Reject</button>
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantOrders;
