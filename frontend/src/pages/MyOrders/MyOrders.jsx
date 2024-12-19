import { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { axiosInstance } from "../../context/axiosConfig";

const MyOrders = () => {
  const { token, updateOrderStatus } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axiosInstance.post("/api/order/userorders");
    setData(response.data.data);
  };

  // Handles the order status change to "Cancelled"
  const handleCancelOrder = async (orderId) => {
    try {
      const orderStatus = "Cancelled"; // Set status to "Cancelled"
      const response = await updateOrderStatus(orderId, orderStatus);

      if (response.success) {
        alert("Order cancelled successfully");
        // Refresh orders list after cancelling
        fetchOrders();
      } else {
        alert("Failed to cancel order: " + response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return item.name + " x " + item.quantity;
                } else {
                  return item.name + " x " + item.quantity + ", ";
                }
              })}
            </p>
            <p>{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.orderStatus}</b>
            </p>
            {order.deliveryBoy ? (
              <>
                <p>{order.deliveryBoy.name}</p>
                <p>{order.deliveryBoy.phone}</p>
              </>
            ) : (
              <p>No delivery boy assigned</p>
            )}
            <button type="button">Track Order</button>
            {order.orderStatus !== "Cancelled" && (
              <button
                type="button"
                onClick={() => handleCancelOrder(order._id)}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
