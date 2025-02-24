import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import main_logo from "../../assets/main_logo.png";

const Navbar = ({ setShowSignin, setShowFeedback }) => {
  const [menu, setMenu] = useState("Home");
  const { token, signOut, cartItems } = useContext(StoreContext);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="navbar px-5 py-0 flex justify-between items-center">
      <Link to="/">
        <img src={main_logo} alt="" className="logo w-32 h-14 px-3.5" />
      </Link>
      <ul className="navbar-menu flex list-none gap-5 text-[#49557e] text-lg">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <NavLink
          to="/feedback"
          onClick={() => setShowFeedback(true)}
          className={menu === "Feedback" ? "active" : ""}
        >
          Feedback
        </NavLink>
        <a
          href="#about"
          onClick={() => setMenu("About")}
          className={menu === "About" ? "active" : ""}
        >
          About
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact")}
          className={menu === "Contact" ? "active" : ""}
        >
          Contact
        </a>
        <NavLink
          to="/profile"
          onClick={() => {
            setMenu("Profile");
            navigate("/profile");
          }}
          className={menu === "Profile" ? "active" : ""}
        >
          Profile
        </NavLink>
      </ul>
      <div className="navbar-right flex items-center gap-3 py-1">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "dot absolute min-w-2.5 min-h-2.5 bg-orange-500 rounded -top-2 -right-2"
            }
          >
            {cartItems.length}
          </div>
        </div>
        {!token ? (
          <>
            <button onClick={() => setShowSignin(true)}>Sign In</button>
            {/* <button>Sign Up</button> */}
          </>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <Link to="/myorders" className="flex items-center gap-2">
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </Link>
              {/* <hr /> */}
              <li onClick={signOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
