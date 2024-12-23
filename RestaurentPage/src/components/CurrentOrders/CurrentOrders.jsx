import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import "./CurrentOrders.css";

const CurrentOrders = () => {
  const { getProcessingOrders, updateOrderStatus } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getProcessingOrders();
        setOrders(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleFoodPrepared = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "waiting for assigning to delivery boy");
      setOrders((prev) => prev.filter((order) => order._id !== orderId)); // Remove processed orders
    } catch (err) {
      console.error(err);
    }
  };

  const renderTimer = (createdAt) => {
    const timeLeft = Math.max(
      0,
      30 * 60 * 1000 - (Date.now() - new Date(createdAt).getTime())
    );
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="current-orders">
      <h2>Current Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p>
              <strong>Timer:</strong> {renderTimer(order.createdAt)}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.amount.toFixed(2)}
            </p>
            <button onClick={() => handleFoodPrepared(order._id)}>
              Food Prepared
            </button>
          </div>
        ))
      ) : (
        <p>No current orders.</p>
      )}
    </div>
  );
};

export default CurrentOrders;
