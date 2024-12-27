import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import "./RestaurantOrders.css";

const RestaurantOrders = () => {
  const { getOrdersByRestaurant, updateOrderStatus } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders once when the component loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrdersByRestaurant(); // Fetch data
        // Filter out orders with orderStatus "processing"

        setOrders(data.data || []); // Store locally
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Dependency ensures fetchOrders is tied to getOrdersByRestaurant

  const handleAccept = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "processing");
      setOrders((prev) =>
        prev.filter((order) => getOrderId(order) !== orderId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "cancelled by restaurant");
      setOrders((prev) =>
        prev.filter((order) => getOrderId(order) !== orderId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getOrderId = (order) => {
    return order.orderId?._id || order._id;
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("RestaurantOrders 57:", orders);

  return (
    <div className="restaurant-orders">
      <h2>Assigned Orders</h2>
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
                <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
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
              <button onClick={() => handleAccept(orderId)}>Accept</button>
              <button onClick={() => handleReject(orderId)}>Reject</button>
            </div>
          );
        })
      ) : (
        <p>No orders assigned yet.</p>
      )}
    </div>
  );
};

export default RestaurantOrders;
