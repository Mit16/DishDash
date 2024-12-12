import React, { useState } from "react";
import "./AddFood.css";

const AddFood = () => {
  const [foods, setFoods] = useState([]);
  const [menus, setMenus] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [menuName, setMenuName] = useState("");
  const [currentSection, setCurrentSection] = useState("home");

  // Add food to the list
  const addFood = () => {
    if (foodName.trim() && foodImage.trim()) {
      setFoods([...foods, { name: foodName, image: foodImage }]);
      setFoodName("");
      setFoodImage("");
    }
  };

  // Remove food from the list
  const removeFood = (index) => {
    const updatedFoods = foods.filter((_, i) => i !== index);
    setFoods(updatedFoods);
  };

  // Add menu to the list
  const addMenu = () => {
    if (menuName.trim()) {
      setMenus([...menus, { name: menuName }]);
      setMenuName("");
    }
  };

  // Remove menu from the list
  const removeMenu = (index) => {
    const updatedMenus = menus.filter((_, i) => i !== index);
    setMenus(updatedMenus);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "white",
        }}
      >
        <h2>Food-Z Restaurant</h2>
        <div>
          <button
            onClick={() => setCurrentSection("home")}
            style={{
              marginRight: "10px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentSection("food")}
            style={{
              marginRight: "10px",
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Food Items
          </button>
          <button
            onClick={() => setCurrentSection("menu")}
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Menus
          </button>
        </div>
      </nav>

      {/* Sections */}
      <div
        style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}
      >
        {currentSection === "home" && (
          <div>
            <h1>Welcome to Our Restaurant</h1>
            <p>Explore our delicious food and carefully curated menus!</p>
          </div>
        )}

        {currentSection === "food" && (
          <div>
            <h2>Food Items</h2>
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={foodImage}
              onChange={(e) => setFoodImage(e.target.value)}
            />
            <button onClick={addFood}>Add Food</button>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {foods.map((food, index) => (
                <li key={index} style={{ margin: "10px 0", textAlign: "left" }}>
                  <img
                    src={food.image}
                    alt={food.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                  {food.name}
                  <button
                    onClick={() => removeFood(index)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentSection === "menu" && (
          <div>
            <h2>Menus</h2>
            <input
              type="text"
              placeholder="Menu Name"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
            <button onClick={addMenu}>Add Menu</button>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {menus.map((menu, index) => (
                <li key={index} style={{ margin: "10px 0", textAlign: "left" }}>
                  {menu.name}
                  <button
                    onClick={() => removeMenu(index)}
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFood;
