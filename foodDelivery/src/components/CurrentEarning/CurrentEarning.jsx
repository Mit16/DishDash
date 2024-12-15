import "./CurrentEarning";
import React, { useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";
import parcel_icon from "../../assets/parcel_icon.png";
const CurrentEarning = () => {
  const { totalEarnings, deliveredOrder } = useContext(DeliveryContext);

  return (
    <div>
      <h3>Current Earnings</h3>
      {/* {deliveredOrder.map((order,index) => (
        <div key={index}>
          <img src={parcel_icon} alt="" />
          <div>
            <p>
              {order.items.map((item,index.length))}
            </p>
          </div>
        </div>
      ) */}
      <p>Total Earnings: ₹{totalEarnings}</p>
    </div>
  );
};

export default CurrentEarning;
