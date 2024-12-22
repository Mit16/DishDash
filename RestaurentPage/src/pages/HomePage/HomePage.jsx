import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { RestaurentContext } from "../../context/RestaurentContext";
import CurrentAssignedOrders from "../../components/CurrentAssignedOrders/CurrentAssignedOrders";
import ShowMenu from "../../components/ShowMenu/ShowMenu";

const HomePage = () => {
  const navigate = useNavigate();
  const { apiURL, token } = useContext(RestaurentContext);

  return (
    <>
      <CurrentAssignedOrders />
      <ShowMenu />
    </>
  );
};

export default HomePage;
