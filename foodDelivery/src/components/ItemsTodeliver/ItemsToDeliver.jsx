import { useContext } from "react";
import "./ItemsToDeliver.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { useNavigate } from "react-router-dom";
import { DeliveryContext } from "../../context/Delivery.context";

const ItemsToDeliver = () => {
  const navigate = useNavigate();
  const { assignedOrders } = useContext(DeliveryContext);

  return (
    <div className="order add">
      <div>
        <h2>Assigned Orders</h2>
        {assignedOrders.length > 0 ? (
          assignedOrders.map((order) => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Amount: ₹{order.amount}</p>
              <p>
                Delivery Address: {order.address.street}, {order.address.city}
              </p>
              <p>Status: {order.status}</p>
            </div>
          ))
        ) : (
          <p>No assigned orders.</p>
        )}
      </div>

      <button onClick={() => navigate("/orders")}>View orders History</button>
    </div>
  );
};

export default ItemsToDeliver;
