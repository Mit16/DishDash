import "./CurrentEarning";
import { useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";
import parcel_icon from "../../assets/parcel_icon.png";

const CurrentEarning = () => {
  const { totalEarnings, deliveredOrders } = useContext(DeliveryContext);

  const currentDeliveredOrder = Array.isArray(deliveredOrders)
    ? deliveredOrders
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    : [];

  return (
    <div>
      <div>
        <h3>Current Earnings</h3>
        <p>Total Earnings: ₹{totalEarnings}</p>
      </div>
      {currentDeliveredOrder.length === 0 ? (
        <p>No Delivered orders to display.</p>
      ) : (
        <ul>
          {currentDeliveredOrder.map((order) => (
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
                <strong>Items:</strong>{" "}
                {order.items.map((item) => (
                  <span key={item._id}>
                    {item.name} (x{item.quantity}) <br />
                  </span>
                ))}
              </p>
              <p>
                <strong>Delivery Amount:</strong> ₹{order.deliveryAmount || 0}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentEarning;
