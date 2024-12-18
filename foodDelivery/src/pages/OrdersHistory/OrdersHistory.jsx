import { useContext } from "react";
import "./OrdersHistory.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { DeliveryContext } from "../../context/Delivery.context";

const OrdersHistory = () => {
  const { assignedOrders } = useContext(DeliveryContext);

  // Sort orders by most recent (assuming orders have a `createdAt` or similar timestamp)
  const sortedOrders = [...assignedOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt); // Replace with your date field
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  return (
    <div className="order-history">
      <h3>Orders History</h3>

      {sortedOrders.length === 0 ? (
        <p>No orders in history.</p>
      ) : (
        <ul>
          {sortedOrders.map(order => (
            <li key={order._id} className="order-item">
              <h4>Order ID: {order._id}</h4>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Customer:</strong> {order.customerDetails.name}
              </p>
              <p>
                <strong>Contact:</strong> {order.customerDetails.phone1}, {order.customerDetails.phone2}
              </p>
              <p>
                <strong>Address:</strong> {`${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zipcode}`}
              </p>
              <p>
                <strong>Items:</strong>{" "}
                {order.items.map(item => (
                  <span key={item._id}>
                    {item.name} (x{item.quantity}) - ₹{item.price} <br />
                  </span>
                ))}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹
                {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
              </p>
              <p>
                <strong>Delivery Amount:</strong> ₹{order.deliveryAmount || 0}
              </p>
              <p>
                <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()} {/* Replace with actual date field */}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersHistory;
