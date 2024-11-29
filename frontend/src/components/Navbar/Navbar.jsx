import { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  const [menu,setMenu] = useState("Menu");

  return (
    <div className="navbar px-5 py-0 flex justify-between items-center">
      <img src={assets.logo} alt="" className="w-32" />
      <ul className="flex list-none gap-5 text-[#49557e] text-lg">
        {/* <li><NavLink >Home</NavLink></li>
        <li><NavLink >Menu</NavLink></li>
        <li><NavLink >Mobile</NavLink></li>
        <li><NavLink >About</NavLink></li>
        <li><NavLink >Contact</NavLink></li> */}
        <li onClick={()=> setMenu("Home")} className={menu === "Home"? "active" : "" }>Home</li>
        <li onClick={()=> setMenu("Menu")} className={menu === "Menu" ? "active" : "" }>Menu</li>
        <li onClick={()=> setMenu("Mobile")} className={menu === "Mobile" ? "active" : "" }>Mobile</li>
        <li onClick={()=> setMenu("About")} className={menu === "About" ? "active" : "" }>About</li>
        <li onClick={()=> setMenu("Contact")} className={menu === "Contact" ? "active" : "" }>Contact</li>
      </ul>
      <div className="flex items-center gap-3 py-1">
        <img src={assets.search_icon} alt="" />
        <div className="relative">
          <img src={assets.basket_icon} alt="" />
          <div className="dot absolute min-w-2.5 min-h-2.5 bg-orange-500 rounded -top-2 -right-2 "></div>
        </div>
        <button>Sign In</button>
        <button>Log In</button>
      </div>
    </div>
  );
};

export default Navbar;
