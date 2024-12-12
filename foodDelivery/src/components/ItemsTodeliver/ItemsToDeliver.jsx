import { useContext } from "react";
import "./ItemsToDeliver.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { useNavigate } from "react-router-dom";
import { DeliveryContext } from "../../context/Delivery.context";

const ItemsToDeliver = () => {
  const navigate = useNavigate();
  const { currentDelivery, statusHandler } = useContext(DeliveryContext);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {console.log(currentDelivery)}
        {currentDelivery.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/orders")}>View orders History</button>
    </div>
  );
};

export default ItemsToDeliver;
