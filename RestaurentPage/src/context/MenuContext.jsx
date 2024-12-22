import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "./axiosConfig";
import { RestaurentContext } from "./RestaurentContext";
import { toast } from "react-toastify";
export const MenuContext = createContext(null);

const MenuContextProvider = (props) => {
  const { restaurentId } = useContext(RestaurentContext);
  const [menuItems, setMenuItems] = useState([]);

  // Get all menu items
  const getAllMenuItems = async () => {
    try {
      const response = await axiosInstance.get("/menu");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Get menu items by restaurant ID
  const getMenuItemsByRestaurant = async () => {
    try {
      const response = await axiosInstance.get(`/api/menu/itemlist`);
      console.log("MenuContext ln25 ", response.data.data);
      if (response.data.success) {
        setMenuItems(response.data.data); // Assuming setMenuItems expects an array
      } else {
        console.log("Menu Item not set");
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Get a specific menu item by ID
  const getMenuItemById = async (menuItemId) => {
    try {
      const response = await axiosInstance.get(`/menu/item/${menuItemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Create a new menu item
  const addMenuItem = async (menuData) => {
    try {
      const response = await axiosInstance.post("api/menu/add", menuData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Update an existing menu item by ID
  const updateMenuItem = async (menuItemId, updatedData) => {
    try {
      const response = await axiosInstance.put(
        `/menu/${menuItemId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Delete a menu item by ID
  const deleteMenuItem = async (menuItemId) => {
    try {
      const response = await axiosInstance.delete(`/menu/${menuItemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const toggleAvailability = async (dishId) => {
    try {
      const response = await axiosInstance.patch(
        `/api/menu/dishes/${dishId}/toggle-availability`
      );

      if (response.data && response.data.success) {
        // Assuming you maintain a local state for the menu
        const updatedDish = response.data.data;
        setMenuItems((prevMenu) =>
          prevMenu.map((dish) =>
            dish._id === updatedDish._id ? { ...dish, ...updatedDish } : dish
          )
        );
      }
      return response.data; // Return the updated dish
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      getMenuItemsByRestaurant();
    }
  }, []);

  const MenuContextValue = {
    menuItems,
    setMenuItems,
    toggleAvailability,
    getAllMenuItems,
    getMenuItemsByRestaurant,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };

  return (
    <MenuContext.Provider value={MenuContextValue}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
