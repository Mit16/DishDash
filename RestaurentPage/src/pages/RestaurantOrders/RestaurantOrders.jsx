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

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("RestaurentOrders 30 : ", orders);

  return (
    <div className="restaurant-orders">
      <h2>Assigned Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => {
          // Calculate the total price of items in the order
          const totalPrice = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order.orderId._id}</h3> {/* Use orderId._id */}
              <p>
                <strong>Payment Method:</strong> {order.orderId.paymentMethod}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{totalPrice.toFixed(2)}
              </p>
              <p>
                <strong>Ordered At:</strong>{" "}
                {new Date(order.orderId.createdAt).toLocaleString()}
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

export default RestaurantOrders;
