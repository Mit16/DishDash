import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
// import { isRouteErrorResponse } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // Flatten foodList to map item IDs directly
  const flattenedFoodList = foodList.flatMap((category) =>
    category.dishes.map((dish) => ({
      ...dish,
      restaurant: category.restaurant.name,
    }))
  );

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Restaurant</p>
          <p>Availability</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {Object.keys(cartItems).map((itemId) => {
          const item = flattenedFoodList.find((dish) => dish._id === itemId);
          if (item) {
            return (
              <div key={item._id} className="cart-items-title cart-items-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />
                <div>
                  <p>{item.name}</p>
                </div>
                <p>{item.restaurant}</p>
                <p className="item-availability">
                  {item.availability ? "Available" : "Out of Stock"}
                </p>
                <p>₹ {item.price}</p>
                <p>{cartItems[itemId]}</p>
                <p>₹ {item.price * cartItems[itemId]}</p>
                <p
                  onClick={() => removeFromCart(itemId)}
                  className="cross"
                  title="Remove item"
                >
                  ❌
                </p>
              </div>
            );
          }
          return null; // Skip if the item is not found in the list
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {Math.max(getTotalCartAmount() / 10, 40)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{" "}
                {getTotalCartAmount() + Math.max(getTotalCartAmount() / 10, 40)}
              </b>
            </div>
          </div>
          <button
            onClick={() => navigate("/order")}
            disabled={getTotalCartAmount() === 0}
            className={`px-4 py-2 text-white rounded ${
              getTotalCartAmount() === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500"
            }`}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here:</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter a Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
