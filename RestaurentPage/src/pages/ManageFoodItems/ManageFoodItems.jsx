import React, { useState } from "react";
import "./ManageFoodItems.css";
import { useNavigate } from "react-router-dom";

const ManageFoodItems = () => {
  const navigate = useNavigate();

  return (
    <div className="manage-food-container">
      <div className="food-form">
        <h3>Add New Food Item</h3>

        <button onClick={() => navigate("/add")}>Add a new dish</button>
      </div>
      <br />
      <hr />
      <br />
      <div className="food-list">
        <h3>Food Items List</h3>
        <ul></ul>
      </div>
    </div>
  );
};

export default ManageFoodItems;
