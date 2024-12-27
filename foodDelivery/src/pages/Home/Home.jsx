import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";

import AssignedOrders from "../../components/AssignedOrders/AssignedOrders";
import OutForDeliveryOrders from "../../components/OutForDeliveryOrders/OutForDeliveryOrders";
import DeliveredOrders from "../../components/DeliveredOrders/DeliveredOrders";
import Earnings from "../../components/Earnings/Earnings";

const Home = () => {
  return (
    <div>
      <Header />
      <Earnings />
      <DeliveredOrders />
      <OutForDeliveryOrders />
      <AssignedOrders />
    </div>
  );
};

export default Home;
