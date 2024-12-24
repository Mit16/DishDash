import React, { useContext, useState, useEffect } from "react";
import "./PreparedOrder.css";
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
        const data = await getwaitingForDeliveryOrders();
        setPreparedOrders(data.data || []);
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
        prev.filter((order) => order.orderId !== orderId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Prepared Orders 42 : ", preparedOrders);

  return (
    <div className="prepared-orders">
      <h2>Prepared Orders</h2>
      {preparedOrders.length > 0 ? (
        preparedOrders.map((order) => {
          const { orderId, items, deliveryPartner } = order;

          return (
            <div key={orderId} className="order-card">
              <h3>Order ID: {orderId}</h3>

              <h4>Items:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item.name || "Unknown Item"} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>

              <h4>Delivery Boy Details:</h4>
              {deliveryPartner ? (
                <p>
                  <strong>Name:</strong>{" "}
                  {deliveryPartner.fullname || "Not Assigned"}
                  <br />
                  <strong>Phone:</strong> {deliveryPartner.phoneNumber}
                </p>
              ) : (
                <p>No delivery boy assigned yet.</p>
              )}

              <button
                className="pickup-button"
                onClick={() => handlePreparedOrder(orderId)}
              >
                Mark as Picked Up
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
