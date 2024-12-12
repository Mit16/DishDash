import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userName, profilePic }) => {
  return (
    <div className="navbar">
      <div className="left-side">
        <span className="restaurant-name">Food-Z Restaurant</span>
        
      </div>
      <div className="right-side">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <span className="username">{userName}</span>
        <div className="buttons">
        <Link to="/home">
            <button className="navbar-btn">Home</button>
          </Link>
          <Link to="/order-status">
            <button className="navbar-btn">Order Status</button>
          </Link>
          <Link to="/manage-food-items">
            <button className="navbar-btn">Manage Food Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
