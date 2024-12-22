import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import Fooditem from "../FoodItem/Fooditem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(StoreContext);

  const filteredFoodList = foodList.flatMap((item) => {
    if (category === "All" || category.toLowerCase() === item.categoryName.toLowerCase()) {
      // Ensure proper mapping of dishes
      return item.dishes.map((dish) => ({
        ...dish,
        categoryName: item.categoryName,
        restaurant: item.restaurant, // Include restaurant details
      }));
    }
    return [];
  });
  

  
  return (
    <div className="food-dislaply" id="food-display">
      <h2>Top Dishes near you.</h2>
      <div className="food-display-list">
        {console.log(filteredFoodList)}
        {filteredFoodList.map((dish, index) => (
          <Fooditem
            key={dish._id || `dish-${index}`} // Use `dish._id` or fallback to index-based key
            id={dish._id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            image={dish.image}
            availability={dish.availability}
            restaurant={dish.restaurant}
            category={dish.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
