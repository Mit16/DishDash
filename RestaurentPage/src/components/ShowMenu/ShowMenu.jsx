import React, { useContext, useState } from "react";

import { MenuContext } from "../../context/MenuContext";
import "./ShowMenu.css";

const ShowMenu = () => {
  const { menuItems, toggleAvailability } = useContext(MenuContext);
  const [selectedDish, setSelectedDish] = useState(null);

  if (menuItems.length === 0) {
    return (
      <>
        <p>
          Empty food list
          <br />
          Add some food Items
        </p>
      </>
    );
  }

  return (
    <>
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
                <p>Availability : {dish.availability}</p>
                {/* <button
                  className="availability-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAvailability(dish._id);
                  }}
                >
                  {dish.availability ? "Mark Unavailable" : "Mark Available"}
                </button> */}
              </div>
              <button
                className="view-details-button"
                onClick={() =>
                  setSelectedDish({ ...dish, addedAt: menu.createdAt })
                }
              >
                View Details
              </button>
            </div>
          ))
        )}
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
          </div>
        </div>
      )}
    </>
  );
};

export default ShowMenu;
