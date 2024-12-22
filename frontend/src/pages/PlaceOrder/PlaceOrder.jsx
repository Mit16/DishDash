import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../context/axiosConfig";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    userDetails,
    token,
    foodList,
    cartItems,
    setCartItems,
  } = useContext(StoreContext);

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
      // Log cart items and food list for debugging
      console.log("Food List:", foodList);
      console.log("Cart Items:", cartItems);
      const orderItems = foodList
        .flatMap((category) =>
          category.dishes.map((dish) => ({
            ...dish,
            restaurant: category.restaurant,
          }))
        )
        .filter((dish) => cartItems[dish._id] && cartItems[dish._id] > 0)
        .map((dish) => ({
          itemId: dish._id,
          name: dish.name,
          price: dish.price,
          quantity: cartItems[dish._id],
          restaurantId: dish.restaurant.id,
        }))
        .filter((item) => item.restaurantId);

      console.log("Mapped Order Items:", orderItems);

      // Check for empty order items
      if (!orderItems || orderItems.length === 0) {
        alert("Your cart is empty. Add items before placing the order.");
        return;
      }

      // Prepare order data
      const orderData = {
        address: addressData,
        items: orderItems,
        deliveryAmount: Math.max(getTotalCartAmount() / 10, 40),
        amount: getTotalCartAmount() + Math.max(getTotalCartAmount() / 10, 40),
        paymentMethod: "Online", // Add a valid payment method
      };

      console.log("Order data being sent:", orderData);

      // Place the order
      const response = await axiosInstance.post("/api/orders/place", orderData);

      if (response.data.success) {
        console.log("Order placed successfully:", response.data);
        alert("Order placed successfully!");
        setShowPopup(true); // Show popup on successful order placement
        setCartItems({}); // Clear the cart

        const orderId = response.data.orderId;

        if (!orderId) {
          console.error("Order ID is missing in the response.");
          alert("Failed to place the order. Please try again.");
          return;
        }

        console.log("Order placed successfully. Order ID:", orderId);

        // Assign the order to a delivery boy
        const assignResponse = await axiosInstance.post(
          "/api/orders/assignorder",
          { orderId }
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
