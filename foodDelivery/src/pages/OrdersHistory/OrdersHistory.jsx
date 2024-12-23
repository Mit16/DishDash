import { useContext } from "react";
import "./OrdersHistory.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { DeliveryContext } from "../../context/Delivery.context";

const OrdersHistory = () => {
  const { assignedOrders } = useContext(DeliveryContext);

  // Sort orders by most recent
  const sortedOrders = [...assignedOrders].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  console.log("OrderHistory 16: sortedOrders :", sortedOrders);

  return (
    <div className="order-history">
      <h3>Orders History</h3>

      {sortedOrders.length === 0 ? (
        <p>No orders in history.</p>
      ) : (
        <ul>
          {sortedOrders.map((order) => (
            <li key={order._id} className="order-item">
              <h4>Order ID: {order.orderId}</h4>
              <p>
                <strong>Status:</strong> {order.orderStatus || "N/A"}
              </p>
              <p>
                <strong>Customer Address:</strong>{" "}
                {order.customerAddress
                  ? `${order.customerAddress.street || "Unknown Street"}, 
                     ${order.customerAddress.city || "Unknown City"}, 
                     ${order.customerAddress.state || "Unknown State"} - 
                     ${order.customerAddress.zipcode || "Unknown ZIP"}`
                  : "Address not available"}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.name}>
                    <p>
                      {item.name} (x{item.quantity || 0})
                    </p>
                    {item.restaurant ? (
                      <p className="restaurant-details">
                        <strong>Restaurant:</strong>{" "}
                        {item.restaurant.restaurentName || "N/A"}
                        <br />
                        <strong>Phone:</strong> {item.restaurant.phone || "N/A"}
                        <br />
                        <strong>Address:</strong>{" "}
                        {item.restaurant.address
                          ? `${
                              item.restaurant.address.street || "Unknown Street"
                            }, 
                             ${item.restaurant.address.city || "Unknown City"}, 
                             ${
                               item.restaurant.address.state || "Unknown State"
                             } - 
                             ${
                               item.restaurant.address.zipcode || "Unknown ZIP"
                             }`
                          : "Address not available"}
                      </p>
                    ) : (
                      <p className="restaurant-details">
                        Restaurant details not available
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total Amount:</strong> ₹{order.amount || 0}
              </p>
              <p>
                <strong>Delivery Amount:</strong> ₹{order.deliveryAmount || 0}
              </p>
              <p>
                <strong>Payment:</strong>{" "}
                {order.payment === true
                  ? order.orderStatus === "Cancelled"
                    ? "Cancelled"
                    : "Done"
                  : "Cash on Delivery"}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "Date not available"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersHistory;
