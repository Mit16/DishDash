import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, URL } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      deliveryAmount: Math.max(getTotalCartAmount() / 10, 40),
      amount: getTotalCartAmount() + Math.max(getTotalCartAmount() / 10, 40),
    };
    let response = await axios.post(URL + "/api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      setShowPopup(true); // Show popup when order is placed successfully
    } else {
      alert("Error placing order");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-icon">✔</div>
            <p>Order Placed Successfully!</p>
            <button className="popup-close" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              placeholder="First Name"
            />
            <input
              required
              type="text"
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              placeholder="Last Name"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Email Id"
          />
          <input
            required
            type="text"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="City"
            />
            <input
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              placeholder="Zip-Code"
            />
            <input
              required
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="Country"
            />
          </div>
          <input
            required
            type="text"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
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
                <b>₹ {getTotalCartAmount() + Math.max(getTotalCartAmount() / 10, 40)}</b>
              </div>
            </div>
            <button type="submit">PLACE ORDER</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
