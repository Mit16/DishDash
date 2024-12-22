import React, { useContext, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../context/axiosConfig";
import "./AddMenu.css";
import { MenuContext } from "../../context/MenuContext";

const AddMenu = () => {
  const { addMenuItem } = useContext(MenuContext);
  const [menuData, setMenuData] = useState({
    restaurantId: "", // Replace with the actual restaurant ID dynamically
    categoryName: "",
    dishes: [
      {
        name: "",
        description: "",
        price: "",
        image: null,
        availability: true,
      },
    ],
  });

  const handleChange = (e, index, field) => {
    const { name, value, files } = e.target;
    // Normalize the category name to avoid case-sensitive duplicates
    if (name === "categoryName") {
      const normalizedValue = value.trim().toLowerCase(); // Convert to lowercase
      setMenuData({ ...menuData, [name]: normalizedValue });
    } else {
      setMenuData({ ...menuData, [name]: value });
    }
    if (field) {
      const updatedDishes = [...menuData.dishes];
      updatedDishes[index][field] = files ? files[0] : value; // Handle file uploads
      setMenuData((prevData) => ({ ...prevData, dishes: updatedDishes }));
    } else {
      setMenuData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddDish = () => {
    setMenuData((prevData) => ({
      ...prevData,
      dishes: [
        ...prevData.dishes,
        {
          name: "",
          description: "",
          price: "",
          image: null,
          availability: true,
        },
      ],
    }));
  };

  const handleRemoveDish = (index) => {
    setMenuData((prevData) => {
      const updatedDishes = prevData.dishes.filter((_, i) => i !== index);
      return { ...prevData, dishes: updatedDishes };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", menuData.categoryName);

    // Add all dish data except images as a JSON string
    const dishesData = menuData.dishes.map(({ image, ...rest }) => rest);
    formData.append("dishes", JSON.stringify(dishesData));

    // Add images separately
    menuData.dishes.forEach((dish, index) => {
      if (dish.image) {
        formData.append(`dishes[${index}][image]`, dish.image);
      }
    });

    try {
      const response = await addMenuItem(formData);
      if (response.success) {
        alert("Menu added successfully!");
        setMenuData({
          categoryName: "",
          dishes: [
            {
              name: "",
              description: "",
              price: "",
              image: null,
              availability: true,
            },
          ],
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Failed to add menu!");
    }
  };

  return (
    <div className="add-menu-container">
      <h2>Add Menu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="categoryName"
          placeholder="Category Name"
          value={menuData.categoryName}
          onChange={handleChange}
          required
        />
        {menuData.dishes.map((dish, index) => (
          <div key={index} className="dish-container">
            <input
              type="text"
              placeholder="Dish Name"
              value={dish.name}
              onChange={(e) => handleChange(e, index, "name")}
              required
            />
            <textarea
              placeholder="Description"
              value={dish.description}
              onChange={(e) => handleChange(e, index, "description")}
              required
            ></textarea>
            <input
              type="number"
              placeholder="Price"
              value={dish.price}
              onChange={(e) => handleChange(e, index, "price")}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(e, index, "image")}
              required
            />
            <button type="button" onClick={() => handleRemoveDish(index)}>
              Remove Dish
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddDish}>
          Add Another Dish
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddMenu;
