import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./ManageFoodItems.css";

const ManageFoodItems = () => {
  const [foodList, setFoodList] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("Pasta");
  const [foodImage, setFoodImage] = useState("");

  const handleAddFood = () => {
    setFoodList([
      ...foodList,
      { foodName, foodPrice, foodCategory, foodImage },
    ]);
    setFoodName("");
    setFoodPrice("");
    setFoodCategory("Pasta");
    setFoodImage("");
  };

  const handleRemoveFood = (index) => {
    setFoodList(foodList.filter((_, i) => i !== index));
  };

  return (
    <div className="manage-food-container">
      <Navbar userName="John Doe" profilePic="/profile.jpg" />
      <div className="food-form">
        <h3>Add New Food Item</h3>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Food Price"
          value={foodPrice}
          onChange={(e) => setFoodPrice(e.target.value)}
        />
        <select
          value={foodCategory}
          onChange={(e) => setFoodCategory(e.target.value)}
        >
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
          <option value="Icecream">Icecream</option>
          <option value="Sweets">Sweets</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFoodImage(URL.createObjectURL(e.target.files[0]))}
        />
        <button onClick={handleAddFood}>Add Food</button>
      </div>
      <div className="food-list">
        <h3>Food Items List</h3>
        <ul>
          {foodList.map((item, index) => (
            <li key={index}>
              <span>{item.foodName} - ${item.foodPrice} </span>
              <button onClick={() => handleRemoveFood(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageFoodItems;
