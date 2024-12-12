import React from 'react'
import "./Menu.css";

const Menu = () => {
  return (
    <div className="menu">
        <h1>Menu</h1>
        <p>Create your menu and give each item a name and a price</p>
        <div className="menu-list">
            <div className="menu-list-food-name">
            <h5>Name</h5>
            <input type="text" placeholder='Enter food name' required/>
            </div>
            <div className="menu-list-food-price">
            <h5>Price (₹)</h5>
            <input type="text" placeholder='Enter food price' required/>
            </div>
            <button>Remove</button>
        </div>
    </div>
  )
}

export default Menu