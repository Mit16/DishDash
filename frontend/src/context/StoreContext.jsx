import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const URL = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);

  const [token, setToken] = useState("");
  const [deliveryGuy, setDeliveryGuy] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        URL + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        URL + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(URL + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        URL + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const assignOrder = async (orderId) => {
    try {
      // Call the API to assign the order
      const response = await axios.post(
        `${URL}/api/order/assignOrder`,
        { orderId }, // No need to include userId explicitly
        { headers: { token } } // Include the token in the headers
      );

      if (response.data.success) {
        const deliveryBoy = response.data.deliveryBoy;

        // Log or display the assigned delivery boy's details to the consumer
        console.log("Order assigned to:", deliveryBoy);
        setDeliveryGuy({
          name: `${deliveryBoy.fullname.firstname} ${deliveryBoy.fullname.lastname}`,
          phone: deliveryBoy.phoneNumber,
        });
        // Example: Show delivery details to the consumer
        alert(
          `Your order has been assigned to ${deliveryBoy.fullname.firstname} ${deliveryBoy.fullname.lastname}. Contact: ${deliveryBoy.phoneNumber}`
        );
      } else {
        console.error("Error assigning order:", response.data.message);
      }
    } catch (error) {
      console.error("Error assigning order:", error);
    }
  };

  const updateProfile = async (phoneNumber, addressData) => {
    const token = localStorage.getItem("Token"); // Assuming token is stored locally
    // const userId = "REPLACE_WITH_ACTUAL_USER_ID"; // Replace dynamically as needed

    const payload = {
      // userId, // Pass the userId
      phone: {
        phone1: phoneNumber.phone.phone1,
        phone2: phoneNumber.phone.phone2,
      },
      address: addressData,
    };

    try {
      const response = await fetch(URL + "/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Auth token from middleware
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        alert("Profile updated successfully!");
        console.log("Updated User:", data.data);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  //to store the token and prevent the logout when refreshed problem
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("Token")) {
        setToken(localStorage.getItem("Token"));
        await loadCartData(localStorage.getItem("Token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    URL,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    assignOrder,
    deliveryGuy,
    updateProfile,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
