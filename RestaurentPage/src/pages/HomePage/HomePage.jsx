import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { RestaurentContext } from "../../context/RestaurentContext";
// import CurrentAssignedOrders from "../../components/CurrentAssignedOrders/CurrentAssignedOrders";
import ShowMenu from "../../components/ShowMenu/ShowMenu";
import CurrentOrders from "../../components/CurrentOrders/CurrentOrders";

const HomePage = () => {
  const navigate = useNavigate();
  const { apiURL, token } = useContext(RestaurentContext);

  return (
    <>
      <ShowMenu />
      <CurrentOrders />
    </>
  );
};

export default HomePage;
