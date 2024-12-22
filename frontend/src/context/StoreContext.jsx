import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { LoginContext } from "./LoginContext";
// import { food_list } from "../assets/assets";
import { axiosInstance } from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const URL = "http://localhost:4000";
  const [foodList, setFoodList] = useState([]);
  const [categoryList, setCategoryList] = useState([]); // New state for categories
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState("");
  const [deliveryGuy, setDeliveryGuy] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  const addToCart = async (itemId) => {
    try {
      // Optimistically update local state
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        return updatedCart;
      });
  
      // Make API call if the user is authenticated
      if (token) {
        const response = await axiosInstance.post("/api/cart/add", { itemId });
        if (!response.data.success) {
          console.error("Failed to add to cart:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Optionally: Revert state if the API call fails
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
          updatedCart[itemId] -= 1;
        } else {
          delete updatedCart[itemId];
        }
        return updatedCart;
      });
    }
  };
  
  const removeFromCart = async (itemId) => {
    try {
      // Optimistically update the local state
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        if (updatedCart[itemId] > 1) {
          updatedCart[itemId] -= 1;
        } else {
          delete updatedCart[itemId];
        }
        return updatedCart;
      });
  
      // Make API call if the user is authenticated
      if (token) {
        const response = await axiosInstance.post("/api/cart/remove", { itemId });
        if (!response.data.success) {
          console.error("Failed to remove item:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
  
      // Optionally revert local state if API call fails
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
        return updatedCart;
      });
    }
  };
  

  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    // Iterate through the cart items
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        // Find the dish in the foodList
        const itemInfo = foodList.flatMap((category) => category.dishes).find((dish) => dish._id === itemId);
  
        // If the dish exists, calculate the total for this item
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
  
    return totalAmount;
  };
  

  const fetchFoodList = async () => {
    try {
      const response = await axiosInstance.get("/api/menu/list");
      if (response.data.success) {
        setFoodList(response.data.data); // Use the formatted data
        extractCategories(response.data.data); // Extract categories from the fetched food data
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const extractCategories = (foodData) => {
    const categories = foodData.map((item) => item.categoryName);
    const uniqueCategories = ["All", ...new Set(categories)];
    setCategoryList(uniqueCategories);
  };

  // Load cart data
  const loadCartData = async () => {
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
      const response = await axiosInstance.post("/api/orders/assignOrder", {
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
    foodList,
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
    categoryList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
