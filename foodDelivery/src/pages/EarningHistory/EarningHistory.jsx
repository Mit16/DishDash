import { useContext } from "react";
import "./EarningHistory.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { DeliveryContext } from "../../context/Delivery.context";
import Earnings from "../../components/Earnings/Earnings";
import DeliveredOrders from "../../components/DeliveredOrders/DeliveredOrders";

const EarningHistory = () => {
  return (
    <div className="order-earning">
      <h3>Earnings :</h3> <Earnings />
      <h3>Earning History</h3>
      <DeliveredOrders />
    </div>
  );
};

export default EarningHistory;
