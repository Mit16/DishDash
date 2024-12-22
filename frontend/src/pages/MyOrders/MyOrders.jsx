import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
// import { assets } from "../../assets/assets";
import { axiosInstance } from "../../context/axiosConfig";

const MyOrders = () => {
  const { token, updateOrderStatus } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  // Fetch orders for the user
  const fetchUserOrders = async () => {
    try {
      const response = await axiosInstance.post("/api/orders/userorders");
      if (response.data.success) {
        const orders = response.data.data;
        console.log("User orders:", orders);
        setOrders(orders);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  // Handles the order status change to "Cancelled"
  // Cancel an order
  const handleCancelOrder = async (orderId) => {
    try {
      const orderStatus = "Cancelled";
      const response = await updateOrderStatus(orderId, orderStatus);
      if (response.success) {
        alert("Order cancelled successfully.");
        fetchUserOrders(); // Refresh orders after cancellation
      } else {
        alert("Failed to cancel order: " + response.message);
      }
    } catch (error) {
      alert("Error cancelling order: " + error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="orders-container">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order ID: {order._id}</h3>
                <p>
                  <strong>Order Status:</strong>{" "}
                  <span className={`status ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </p>
              </div>
              <div className="order-details">
                <h4>Order Summary:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Subtotal:</strong> ₹
                  {order.amount - order.deliveryAmount}
                </p>
                <p>
                  <strong>Delivery Fee:</strong> ₹{order.deliveryAmount}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.amount}
                </p>
              </div>

              {/* <div className="restaurant-info">
                <h4>Restaurant Information:</h4>
                <p>
                  <strong>Name:</strong> {order.restaurantId.name || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${order.restaurantId.address.street}, ${order.restaurantId.address.city}, ${order.restaurantId.address.state} - ${order.restaurantId.address.zipcode}`}
                </p>
              </div> */}

              <div className="delivery-info">
                <h4>Delivery Information:</h4>
                <p>
                  <strong>Address:</strong>{" "}
                  {`${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zipcode}`}
                </p>
                {order.deliveryPartnerId ? (
                  <p>
                    <strong>Delivery Partner:</strong>{" "}
                    {`${order.deliveryPartnerId.fullname.firstname} ${order.deliveryPartnerId.fullname.lastname}`}{" "}
                    ({order.deliveryPartnerId.email})
                  </p>
                ) : (
                  <p>No delivery partner assigned yet.</p>
                )}
              </div>

              <button type="button">Track Order</button>
              <div className="order-actions">
                {order.orderStatus !== "Cancelled" && (
                  <button onClick={() => handleCancelOrder(order._id)}>
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
