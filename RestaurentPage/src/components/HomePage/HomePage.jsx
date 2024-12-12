import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar userName="John Doe" profilePic="/profile.jpg" />
      <div className="welcome-section">
        <h2>Welcome to Your Restaurant Portal</h2>
      </div>
      <div className="food-section">
        <h3>Food Items List</h3>
        <button onClick={() => navigate("/manage-food-items")}>
          Manage Food Items
        </button>
      </div>
      <div className="menu-section">
        <h3>Menus List</h3>
        <button onClick={() => navigate("/manage-food-items")}>
          Manage Menus
        </button>
      </div>
    </div>
  );
};

export default HomePage;
