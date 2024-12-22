import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "./axiosConfig";

export const RestaurentContext = createContext(null);

const RestaurantContextProvider = (props) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [restaurentId, setRestaurentID] = useState(""); // Fetch `restaurantId` from route params
  const apiURL = "http://localhost:4000";
  const [restaurantDetails, setrestaurentDetails] = useState({});
  const [updateDetails, setUpdateDetails] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);

  // Fetch user details (including `_id`)
  const fetchRestaurentDetails = async () => {
    try {
      const response = await axiosInstance.get("/api/restaurants/details");
      console.log("Restaurant details response:", response.data);
      if (response.data.success && response.data.data._id) {
        setRestaurentID(response.data.data._id); // Set the fetched ID
        setProfileCompleted(response.data.data.profileCompleted || false);
        return response; // Return response for chaining
      } else {
        console.error("Failed to fetch restaurant details");
      }
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch a specific restaurant by ID
  const fetchRestaurantById = async () => {
    if (!restaurentId) {
      console.error("Restaurant ID is empty, cannot fetch details");
      return null;
    }

    try {
      const response = await axiosInstance.get(
        `/api/restaurants/details/${restaurentId}`
      );
      // console.log(
      //   "Restaurant details fetched successfully:",
      //   response.data.data
      // );
      if (response.data.success) {
        setrestaurentDetails(response.data.data);
        return response.data.data; // Return data for use elsewhere
      }
    } catch (error) {
      console.error(
        "Error fetching restaurant details:",
        error.response?.data || error.message
      );
    }
    return null;
  };

  // Update an existing restaurant by ID
  const updateRestaurant = async (updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/api/restaurants/update`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error updating restaurant",
        }
      );
    }
  };

  // Toggle the active status of a restaurant
  const toggleRestaurantStatus = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/restaurants/toggle-active-status`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error toggling status",
        }
      );
    }
  };

  const toggleRestaurantProfileStatus = async () => {
    try {
      const response = await axiosInstance.patch(
        `/api/restaurants/toggle-profile-status`
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error toggling status",
        }
      );
    }
  };

  // Signout function
  const Signout = () => {
    localStorage.removeItem("Token");
    setToken("");
    navigate("/");
  };

  // Signin function
  const Signin = async (newToken) => {
    localStorage.setItem("Token", newToken);
    setToken(newToken);

    try {
      const response = await fetchRestaurentDetails(); // Fetch user data
      if (response?.data?.success) {
        setProfileCompleted(response.data.data.profileCompleted || false);
      } else {
        console.error("Failed to fetch restaurant details during signin.");
      }
    } catch (error) {
      console.error("Error during Signin:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("Token");
      if (storedToken) {
        setToken(storedToken);

        // Fetch restaurant details and wait for ID
        try {
          const response = await fetchRestaurentDetails();
          if (response && response.data.success) {
            // console.log("Restaurant ID fetched:", response.data.data._id);
            setRestaurentID(response.data.data._id);
            setProfileCompleted(response.data.data.profileCompleted);
          } else {
            console.error("Failed to fetch restaurant details");
          }
        } catch (error) {
          console.error("Error during initial data loading:", error.message);
        }
      } else {
        console.error("No token found in localStorage!");
      }
    }
    loadData();
  }, []);

  // Fetch restaurant details by ID once it's set
  useEffect(() => {
    if (restaurentId) {
      fetchRestaurantById();
    }
  }, [restaurentId]);

  const RestaurentContextValue = {
    Signin,
    Signout,
    token,
    apiURL,
    restaurentId,
    fetchRestaurantById,
    updateRestaurant,
    toggleRestaurantStatus,
    toggleRestaurantProfileStatus,
    restaurantDetails,
    updateDetails,
    setUpdateDetails,
    profileCompleted,
    setProfileCompleted,
    fetchRestaurentDetails,
  };

  return (
    <RestaurentContext.Provider value={RestaurentContextValue}>
      {props.children}
    </RestaurentContext.Provider>
  );
};

export default RestaurantContextProvider;
