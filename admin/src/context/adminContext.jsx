import { createContext } from "react";

export const adminContext = createContext(null);

const adminContextProvider = (props) => {
     // Fetch all restaurants
  const fetchAllRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/api/restaurants");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error fetching restaurants",
        }
      );
    }
  };

  // Create a new restaurant
  const createRestaurant = async (restaurantData) => {
    try {
      const response = await axiosInstance.post(
        "/api/restaurants",
        restaurantData
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error creating restaurant",
        }
      );
    }
  };


  // Delete a restaurant by ID
  const deleteRestaurant = async (id) => {
    try {
      const response = await axiosInstance.delete(`/api/restaurants/${id}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          success: false,
          message: "Error deleting restaurant",
        }
      );
    }
  };

  const adminContextValue = {};

  return <adminContext.Provider>{props.children}</adminContext.Provider>;
};
