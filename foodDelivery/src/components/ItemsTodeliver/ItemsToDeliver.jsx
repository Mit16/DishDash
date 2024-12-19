import { useContext, useState } from "react";
import "./ItemsToDeliver.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { useNavigate } from "react-router-dom";
import { DeliveryContext } from "../../context/Delivery.context";

const ItemsToDeliver = () => {
  const navigate = useNavigate();
  const { assignedOrders, updateOrderStatus } = useContext(DeliveryContext);

  const [selectedStatus, setSelectedStatus] = useState({}); // Track selected statuses

  // Filter and sort orders by date (recent first)
  const filteredOrders = assignedOrders
    .filter((order) => order.orderStatus !== "Delivered")
    .filter((order) => order.orderStatus !== "Cancelled")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  const handleStatusUpdate = async (orderId) => {
    try {
      const orderStatus = selectedStatus[orderId] || "";
      if (!orderStatus) {
        alert("Please select a status before updating.");
        return;
      }

      const response = await updateOrderStatus(orderId, orderStatus);

      if (response.success) {
        alert("Order status updated successfully");
      } else {
        alert("Failed to update order status: " + response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

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
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <div className="status-update">
                {order.orderStatus === "Cancelled" ? (
                  <p style={{ color: "green" }}>
                    <strong>Order Cancelled: Status cannot be modified.</strong>
                  </p>
                ) : (
                  <>
                    <select
                      onChange={(event) =>
                        handleStatusChange(order._id, event.target.value)
                      }
                      value={selectedStatus[order._id] || order.orderStatus}
                    >
                      <option value="Assigned to Delivery Agent">
                        Assigned to Delivery Agent
                      </option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button onClick={() => handleStatusUpdate(order._id)}>
                      Update Status
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={() => navigate("/orders")}>View Orders History</button>
    </div>
  );
};

export default ItemsToDeliver;
