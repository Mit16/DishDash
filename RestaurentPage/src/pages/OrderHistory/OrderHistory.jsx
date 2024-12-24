import React, { useContext, useState, useEffect } from "react";
import "./OrderHistory.css";
import { OrderContext } from "../../context/OrderContext";

const OrderHistory = () => {
  const { getOrdersByRestaurant } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders once when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByRestaurant(); // Fetch data
        setOrders(data.data || []); // Store locally
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Dependency ensures fetchOrders is tied to getOrdersByRestaurant

  const getOrderId = (order) => {
    return order.orderId?._id || order._id;
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Orderhistory 61:", orders);

  return (
    <div className="restaurant-orders">
      <h2>Orders History</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          const orderId = getOrderId(order);
          if (!orderId) {
            console.warn(`Missing orderId for order: ${order._id}`);
            return null; // Skip rendering if no valid ID is available
          }

          const totalPrice = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div key={orderId} className="order-card">
              <h3>Order ID: {orderId}</h3>
              <p>
                <strong>Order Status:</strong>{" "}
                {order.orderId?.orderStatus || "Not available"}
              </p>
              <p>
                <strong>Ordered At:</strong>{" "}
                {new Date(
                  order.orderId?.createdAt || Date.now()
                ).toLocaleString()}
              </p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      ) : (
        <p>No orders assigned yet.</p>
      )}
    </div>
  );
};

export default OrderHistory;
