import React from "react";
import './Header.css'
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents absolute flex flex-col items-start">
        <h2 className="font-medium text-white">
          Order your favourite food here
        </h2>
        <p className="text-white text-[1vw]">
          Choose from a diverse menu featuring a delecated array of dishes
          crafted with the finest ingridients and culinary expertise. Our
          mission is to satisfy your carvings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
    </div>
  );
};

export default Header;
