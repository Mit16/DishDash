import { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
// import { PriceContext } from "../../context/PriceContext";

const Fooditem = ({
  id,
  name,
  price,
  description,
  image,
  availability,
  restaurant,
  category,
}) => {
  // const { indianPrice } = useContext(PriceContext);

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="food-item food-item-card" onClick={openModal}>
        <div className="food-item-img-container">
          <img className="food-item-img" src={image} alt="" />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(id);
              }}
              src={assets.add_icon_white}
              alt="Add to cart"
            />
          ) : (
            <div
              className="food-item-counter"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="Remove from cart"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="Add more to cart"
              />
            </div>
          )}
        </div>
        {/* {console.log(itemCount)} */}
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-desc">{category}</p>
          <p className="food-item-price">₹ {price}</p>
          <p
            className={`availability ${
              availability ? "available" : "unavailable"
            }`}
          >
            {availability ? "Available" : "Unavailable"}
          </p>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <h2>
              <b>{name}</b>
            </h2>
            <img className="modal-image" src={image} alt={name} />
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Category:</strong> {category}
            </p>
            <p>
              <strong>Price:</strong> ₹ {price}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              {availability ? "Available" : "Unavailable"}
            </p>
            <hr />
            <h3>Restaurant Details</h3>
            <p>
              <strong>Name:</strong> {restaurant.name}
            </p>
            <p>
              <strong>Phone:</strong> {restaurant.phone}
            </p>
            <p>
              <strong>Email:</strong> {restaurant.email}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Fooditem;
