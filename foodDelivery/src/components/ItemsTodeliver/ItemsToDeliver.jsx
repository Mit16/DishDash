import { useContext } from "react";
import "./ItemsToDeliver.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { useNavigate } from "react-router-dom";
import { DeliveryContext } from "../../context/Delivery.context";

const ItemsToDeliver = () => {
  const navigate = useNavigate();
  const { assignedOrders } = useContext(DeliveryContext);

  // Filter orders with status not equal to "Delivered" and get top 5
  const filteredOrders = assignedOrders
    .filter((order) => order.orderStatus !== "Delivered")
    .slice(0, 5);

  return (
    <div className="order-list">
      <div>
        <h2>Assigned Orders</h2>
      </div>

      {filteredOrders.length === 0 ? (
        <p>No orders to display.</p>
      ) : (
        <ul>
          {filteredOrders.map((order) => (
            <li key={order._id} className="order-item">
              <img src={parcel_icon} alt="" height="20px" width="20px" />
              <h4>Order ID: {order._id}</h4>
              <p>
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p>
                <strong>Customer:</strong> {order.customerDetails.name}
              </p>
              <p>
                <strong>Contact:</strong> {order.customerDetails.phone1},{" "}
                {order.customerDetails.phone2}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.zipcode}`}
              </p>
              <p>
                <strong>Items:</strong>{" "}
                {order.items.map((item) => (
                  <span key={item._id}>
                    {item.name} (x{item.quantity}) - ₹{item.price} <br />
                  </span>
                ))}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹
                {order.items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </p>
              <p>
                <strong>Delivery Amount:</strong> ₹{order.deliveryAmount || 0}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}{" "}
                {/* Replace with actual date field */}
              </p>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/orders")}>View Orders History</button>
    </div>
  );
};

export default ItemsToDeliver;
