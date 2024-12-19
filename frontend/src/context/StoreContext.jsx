import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { LoginContext } from "./LoginContext";
// import { food_list } from "../assets/assets";
import { axiosInstance } from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const URL = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState("");
  const [deliveryGuy, setDeliveryGuy] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
      if (token) {
        await axiosInstance.post("/api/cart/add", { itemId });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: Math.max((prev[itemId] || 1) - 1, 0), // Prevent negative values
      }));
      if (token) {
        await axiosInstance.post("/api/cart/remove", { itemId });
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
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
    try {
      const response = await axios.get(URL + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data
  const loadCartData = async (token) => {
    try {
      const response = await axiosInstance.post("/api/cart/get");
      setCartItems(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  const assignOrder = async (orderId) => {
    try {
      // Call the API to assign the order
      const response = await axiosInstance.post("/api/order/assignOrder", {
        orderId,
      });

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
        alert("Failed to assign delivery boy. Please try again.");
      }
    } catch (error) {
      console.error("Error assigning order:", error);
      alert("An unexpected error occurred while assigning the order.");
    }
  };

  const updateProfile = async (phoneNumber, addressData) => {
    // const token = localStorage.getItem("Token"); // Assuming token is stored locally
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
      const response = await axiosInstance.post("/api/user/profile", payload);

      if (response.data.success) {
        alert("Profile updated successfully!");
        console.log("Updated User:", response.data.data);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/user/details");

      if (response.data.success) {
        setUserDetails(response.data.data);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await axiosInstance.post("/api/user/status", {
        orderId,
        orderStatus,
      });

      return response.data; // Return the response data for success/failure handling
    } catch (error) {
      console.error("Error updating order status:", error);
      throw new Error("An error occurred while updating order status.");
    }
  };

  const signOut = () => {
    setToken(""); // Clear the token
    setCartItems({}); // Clear the cart items
    setUserDetails({}); // Clear user details
    localStorage.removeItem("Token"); // Clear the token from localStorage
    navigate("/");
  };

  //to store the token and prevent the logout when refreshed problem
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("Token")) {
        setToken(localStorage.getItem("Token"));
      }
    }
    loadData();
  }, []); // Only run once on component mount

  useEffect(() => {
    async function fetchData() {
      if (token) {
        await loadCartData(token);
        await fetchUserDetails();
      }
    }
    fetchData();
  }, [token]); // Re-run whenever token changes

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
    userDetails,
    signOut,
    updateOrderStatus,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
