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
      setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="current-orders">
      <h2>Current Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          const { orderId, items, amount, payment, paymentMethod, createdAt } =
            order.orderId;

          const formattedDate = new Date(createdAt).toLocaleString();

          return (
            <div key={orderId} className="order-card">
              <h3>Order ID: {orderId}</h3>
              <p>
                <strong>Order Date:</strong> {formattedDate}
              </p>
              <h4>Items:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={`${orderId}-${item.itemId || index}`}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total Price:</strong> ₹{amount.toFixed(2)}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {payment ? "Paid" : "Not Paid"}
              </p>
              <p>
                <strong>Payment Method:</strong> {paymentMethod}
              </p>
              <button
                className="prepared-button"
                onClick={() => handleFoodPrepared(orderId)}
              >
                Mark as Prepared
              </button>
            </div>
          );
        })
      ) : (
        <p className="no-orders">No current orders.</p>
      )}
    </div>
  );
};

export default CurrentOrders;
