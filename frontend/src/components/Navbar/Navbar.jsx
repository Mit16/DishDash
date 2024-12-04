import { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import main_logo from "../../assets/main_logo.png";

const Navbar = ({ setShowSignin, setShowFeedback }) => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken } = useContext(StoreContext);
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
  };

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
        <Link
          to="/feedback"
          onClick={() => setShowFeedback(true)}
          className={menu === "Feedback" ? "active" : ""}
        >
          Feedback
        </Link>
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
          ></div>
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
              <li>
                <img
                  onClick={() => navigate("/myorders")}
                  src={assets.bag_icon}
                  alt=""
                />
                <p>Orders</p>
              </li>
              {/* <hr /> */}
              <li onClick={logout}>
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
