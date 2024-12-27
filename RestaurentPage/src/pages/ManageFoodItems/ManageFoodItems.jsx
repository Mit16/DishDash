import React, { useContext, useState } from "react";
import "./ManageFoodItems.css";
import { MenuContext } from "../../context/MenuContext";
import { useNavigate } from "react-router-dom";

const ManageFoodItems = () => {
  const { menuItems, toggleAvailability, deleteMenuItem } = useContext(MenuContext);
  const [selectedDish, setSelectedDish] = useState(null);
  const navigate = useNavigate();

  if (menuItems.length === 0) {
    return (
      <div className="manage-food-container">
        <div className="food-form">
          <h3>Add New Food Item</h3>
          <button onClick={() => navigate("/add")}>Add a new dish</button>
        </div>
        <br />
        <hr />
        <br />
        <p>
          Empty food list
          <br />
          Add some food Items
        </p>
      </div>
    );
  }

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
        <div className="menu-container">
          {menuItems.map((menu) =>
            menu.dishes.map((dish) => (
              <div key={dish._id} className="menu-card">
                <div className="menu-card-image">
                  <img src={dish.image} alt={dish.name} />
                </div>
                <div className="menu-card-details">
                  <h3>{dish.name}</h3>
                  <p>Category: {menu.categoryName}</p>
                  <p>Price: ₹{dish.price}</p>
                  <p>Availability: {dish.availability ? "Available" : "Unavailable"}</p>
                </div>
                <button
                  className="view-details-button"
                  onClick={() =>
                    setSelectedDish({ ...dish, addedAt: menu.createdAt })
                  }
                >
                  View Details
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteMenuItem(dish._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedDish && (
        <div className="dish-details-overlay">
          <div className="dish-details">
            <button
              className="close-button"
              onClick={() => setSelectedDish(null)}
            >
              ✖
            </button>
            <h2>{selectedDish.name}</h2>
            <p>
              <strong>Description:</strong> {selectedDish.description}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedDish.price}
            </p>
            <p>
              <strong>Category:</strong> {selectedDish.categoryName}
            </p>
            <p>
              <strong>Added At:</strong>{" "}
              {new Date(selectedDish.addedAt).toLocaleString()}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {selectedDish.availability ? "Available" : "Unavailable"}
            </p>
            <img src={selectedDish.image} alt={selectedDish.name} />
            <button
              className="availability-toggle"
              onClick={() => toggleAvailability(selectedDish._id)}
            >
              {selectedDish.availability
                ? "Mark Unavailable"
                : "Mark Available"}
            </button>
            <button
              className="delete-button"
              onClick={() => {
                deleteMenuItem(selectedDish._id);
                setSelectedDish(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFoodItems;
