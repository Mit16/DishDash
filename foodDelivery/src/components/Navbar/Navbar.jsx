import { Link, NavLink } from "react-router-dom";
import main_logo from "../../assets/main_logo.png";
import "./Navbar.css";
import { useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";

const Navbar = () => {
  const { Signout } = useContext(DeliveryContext);

  return (
    <nav>
      <div>
        <img src={main_logo} className="main-logo" alt="" />
      </div>
      <div>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/earnings">Earnings</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>

        <button type="button" onClick={Signout}>
          {/* <img src={assets.logout_icon} alt="" /> */}
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
