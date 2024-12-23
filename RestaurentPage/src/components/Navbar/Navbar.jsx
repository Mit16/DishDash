import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { RestaurentContext } from "../../context/RestaurentContext";
import { MenuContext } from "../../context/MenuContext";

const Navbar = () => {
  const { Signout, token } = useContext(RestaurentContext);
  const { setMenuItems } = useContext(MenuContext);

  const handleSignout = () => {
    Signout();
    setMenuItems([]);
  };
  return (
    <div className="navbar">
      <div className="left-side">
        <span className="restaurant-name">Food-Z Restaurant</span>
      </div>
      <div className="right-side">
        {token ? (
          <>
            {/* <img src={profilePic} alt="Profile" className="profile-pic" /> */}
            <span className="username">{"Temp User"}</span>
            <div className="buttons">
              <Link to="/home">
                <button className="navbar-btn">Home</button>
              </Link>
              <Link to="/order-status">
                <button className="navbar-btn">Order Status</button>
              </Link>
              <Link to="/restaurant-orders" className="navbar-btn">
                Orders
              </Link>
              <Link to="/manage-food-items">
                <button className="navbar-btn">Manage Food Items</button>
              </Link>
              <Link to="/profile">
                <button className="navbar-btn">Profile</button>
              </Link>
            </div>
            <button type="button" onClick={() => handleSignout()}>
              {/* <img src={assets.logout_icon} alt="" /> */}
              Log Out
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
