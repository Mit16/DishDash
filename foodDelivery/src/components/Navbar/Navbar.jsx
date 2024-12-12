import { Link, NavLink } from "react-router-dom";
import main_logo from "../../assets/main_logo.png";
import "./Navbar.css";

const Navbar = () => {
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
      </div>
    </nav>
  );
};

export default Navbar;
