import React, { useContext, useState, useEffect } from "react";
import "./Preparedorder.css";
import { OrderContext } from "../../context/OrderContext";

const PreparedOrder = () => {
  const { getwaitingForDeliveryOrders, updateOrderStatus } =
    useContext(OrderContext);
  const [preparedOrders, setPreparedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreparedOrders = async () => {
      try {
        setLoading(true);
        const data = await getwaitingForDeliveryOrders(); // Fetch data
        setPreparedOrders(data.data || []); // Store locally
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreparedOrders();
  }, []);

  const handlePreparedOrder = async (orderId) => {
    try {
      await updateOrderStatus(orderId, "picked up by delivery boy");
      setPreparedOrders((prev) =>
        prev.filter((order) => order._id !== orderId)
      ); // Remove processed orders
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="prepared-orders">
      <h2>Prepared Orders</h2>
      {preparedOrders.length > 0 ? (
        preparedOrders.map((order) => {
          const { _id, items, amount, address, deliveryPartner, orderDate } =
            order;

          const formattedDate = new Date(orderDate).toLocaleString();

          return (
            <div key={_id} className="order-card">
              <h3>Order ID: {_id}</h3>
              <p>
                <strong>Total Amount:</strong> ₹{amount.toFixed(2)}
              </p>
              <p>
                <strong>Order Date:</strong> {formattedDate}
              </p>
              <p>
                <strong>Delivery Address:</strong>{" "}
                {`${address.street}, ${address.city}, ${address.state} - ${address.zipcode}`}
              </p>
              <h4>Items:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={item._id || index}>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </li>
                ))}
              </ul>

              <h4>Delivery Boy Details:</h4>
              {deliveryPartner ? (
                <p>
                  <strong>Name:</strong>{" "}
                  {`${deliveryPartner.fullname.firstname} ${deliveryPartner.fullname.lastname}`}{" "}
                  <br />
                  <strong>Phone:</strong> {deliveryPartner.phoneNumber}
                </p>
              ) : (
                <p>No delivery boy assigned yet.</p>
              )}
              <button
                className="pickup-button"
                onClick={() => handlePreparedOrder(_id)}
              >
                Picked up by delivery boy
              </button>
            </div>
          );
        })
      ) : (
        <p>No prepared orders available.</p>
      )}
    </div>
  );
};

export default PreparedOrder;
