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
      await updateOrderStatus(orderId, "waiting for delivery boy");
      setOrders((prev) => prev.filter((order) => order._id !== orderId)); // Remove processed orders
    } catch (err) {
      console.error(err);
    }
  };

  // const renderTimer = (createdAt) => {
  //   const timeLeft = Math.max(
  //     0,
  //     30 * 60 * 1000 - (Date.now() - new Date(createdAt).getTime())
  //   );
  //   const minutes = Math.floor(timeLeft / 60000);
  //   const seconds = Math.floor((timeLeft % 60000) / 1000);

  //   return `${minutes}m ${seconds}s`;
  // };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("CurrentOrders : 50 ", orders);

  return (
    <div className="current-orders">
      <h2>Current Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            {/* <p>
              <strong>Timer:</strong> {renderTimer(order.createdAt)}
            </p> */}
            <p>
              <strong>Items:</strong>
              <ul>
                {order.items.map((item) => (
                  <li key={item.itemId}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </p>
            <p>
              <strong>Total Price:</strong> ₹{order.amount.toFixed(2)}
            </p>
            <p>
              <strong>Delivery Charge:</strong> ₹
              {order.deliveryAmount.toFixed(2)}
            </p>
            <p>
              <strong>Payment Status:</strong>{" "}
              {order.payment ? "Paid" : "Not Paid"}
            </p>
            <p>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>Delivery Address:</strong>{" "}
              {`${order.address.street}, ${order.address.city}, ${order.address.district}, ${order.address.state}, ${order.address.zipcode}`}
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
