import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [userDetails, setUserDetails] = useState({});

  const { getTotalCartAmount, token, food_list, cartItems, URL, setCartItems } =
    useContext(StoreContext);

  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    zipcode: "",
  });

  const [customerDetails, setCustomerDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone1: "",
    phone2: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("Token");
    try {
      const response = await fetch(URL + "/api/user/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUserDetails(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Autofill form with stored address
  const autofillAddress = () => {
    if (userDetails.address) {
      setAddressData({
        street: userDetails.address.street || "",
        city: userDetails.address.city || "",
        district: userDetails.address.district || "",
        state: userDetails.address.state || "",
        zipcode: userDetails.address.zipcode || "",
      });
      setCustomerDetails({
        firstname: userDetails.fullname?.firstname || "",
        lastname: userDetails.fullname?.lastname || "",
        email: userDetails.email || "",
        phone1: userDetails.phone?.phone1 || "",
        phone2: userDetails.phone?.phone2 || "",
      });
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddressData((data) => ({ ...data, [name]: value }));
  };

  const onCustomerChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCustomerDetails((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({ ...item, quantity: cartItems[item._id] });
        }
      });

      const orderData = {
        address: addressData,
        items: orderItems,
        deliveryAmount: Math.max(getTotalCartAmount() / 10, 40),
        amount: getTotalCartAmount() + Math.max(getTotalCartAmount() / 10, 40),
        customerDetails: {
          name: `${customerDetails.firstname} ${customerDetails.lastname}`,
          phone1: customerDetails.phone1,
          phone2: customerDetails.phone2,
        },
      };

      // Place the order
      const response = await axios.post(`${URL}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        setShowPopup(true); // Show popup when order is placed successfully
        setCartItems({});

        // Assign order to a delivery boy
        const orderId = response.data.orderId;

        if (!orderId) {
          console.error("Order ID is missing in the response.");
          alert("Failed to place the order. Please try again.");
          return;
        }

        console.log("Order placed successfully. Order ID:", orderId);

        // Assign the order to a delivery boy
        const assignResponse = await axios.post(
          `${URL}/api/order/assignOrder`,
          { orderId },
          { headers: { token } }
        );

        if (assignResponse.data.success) {
          alert(
            `Order assigned to: ${assignResponse.data.deliveryBoy.fullname.firstname} ${assignResponse.data.deliveryBoy.fullname.lastname}`
          );
        } else {
          console.error("Assign order failed:", assignResponse.data.message);
          alert("Failed to assign delivery boy. Please try again.");
        }
      } else {
        console.error("Place order failed:", response.data.message);
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing or assigning order:", error);
      alert("An unexpected error occurred.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
    if (!token || getTotalCartAmount() === 0) {
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
          <button type="button" onClick={autofillAddress}>
            Use Stored Address
          </button>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="firstname"
              onChange={onCustomerChangeHandler}
              value={customerDetails.firstname}
              placeholder="First Name"
            />
            <input
              required
              type="text"
              name="lastname"
              onChange={onCustomerChangeHandler}
              value={customerDetails.lastname}
              placeholder="Last Name"
            />
          </div>
          <input
            required
            type="email"
            name="email"
            onChange={onCustomerChangeHandler}
            value={customerDetails.email}
            placeholder="Email Id"
          />
          <input
            required
            type="text"
            name="street"
            onChange={onChangeHandler}
            value={addressData.street}
            placeholder="Street"
          />
          <div className="multi-fields">
            <input
              required
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={addressData.city}
              placeholder="City"
            />
            <input
              required
              type="text"
              name="state"
              onChange={onChangeHandler}
              value={addressData.state}
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              required
              type="text"
              name="zipcode"
              onChange={onChangeHandler}
              value={addressData.zipcode}
              placeholder="Zip-Code"
            />
            {/* <input
              required
              defaultValue="India"
              type="text"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              placeholder="Country"
            /> */}
          </div>
          <input
            required
            type="text"
            name="phone1"
            onChange={onCustomerChangeHandler}
            value={customerDetails.phone1}
            placeholder="Phone Number"
          />
          <input
            required
            type="text"
            name="phone2"
            onChange={onCustomerChangeHandler}
            value={customerDetails.phone2}
            placeholder="Other Phone Number"
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
                <b>
                  ₹{" "}
                  {getTotalCartAmount() +
                    Math.max(getTotalCartAmount() / 10, 40)}
                </b>
              </div>
            </div>
            <button
              className=" bg-orange-500 text-white font-semibold"
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
