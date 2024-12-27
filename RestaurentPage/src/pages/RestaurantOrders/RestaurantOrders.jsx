import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import "./RestaurantOrders.css";

const RestaurantOrders = () => {
  const { getOrderedStatusOrders, updateOrderStatus } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrderedStatusOrders(); // Fetch "Ordered" status orders
        setOrders(data.data || []); // Store orders
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle Accept Button
  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "processing"); // Update status to "processing"
      setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Reject Button
  const handleReject = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "cancelled by restaurant"); // Update status to "cancelled by restaurant"
      setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("RestaurantOrders 59:", orders);

  return (
    <div className="restaurant-orders">
      <h2>Orders with Status: "Ordered"</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          const orderId = order.orderId; // Direct access to orderId
          if (!orderId) {
            console.warn(`Missing orderId for order: ${order}`);
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
                <strong>Order Status:</strong> {order.orderStatus}
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
                {order.items.map((item, index) => (
                  <li key={`${orderId}-${index}`}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="order-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(orderId)}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(orderId)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No orders found with status 'Ordered'.</p>
      )}
    </div>
  );
};

export default RestaurantOrders;
