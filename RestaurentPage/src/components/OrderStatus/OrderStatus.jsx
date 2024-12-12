import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./OrderStatus.css";

const OrderStatus = () => {
  const [status, setStatus] = useState("Pending Order");

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="order-status-container">
      <Navbar userName="John Doe" profilePic="/profile.jpg" />
      <div className="order-details">
        <h3>Order Details</h3>
        <p>Customer Name: Jane Smith</p>
        <p>Food Item: Pasta</p>
        <p>Quantity: 2</p>
        <p>Status: {status}</p>
        <button onClick={() => handleChangeStatus("Out for Delivery")}>Out for Delivery</button>
        <button onClick={() => handleChangeStatus("Item Delivered")}>Item Delivered</button>
      </div>
    </div>
  );
};

export default OrderStatus;
