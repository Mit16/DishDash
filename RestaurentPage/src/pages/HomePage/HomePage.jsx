import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { RestaurentContext } from "../../context/RestaurentContext";
// import CurrentAssignedOrders from "../../components/CurrentAssignedOrders/CurrentAssignedOrders";
import ShowMenu from "../../components/ShowMenu/ShowMenu";
import CurrentOrders from "../../components/CurrentOrders/CurrentOrders";
import PreparedOrder from "../../components/PreparedOrder/PreparedOrder";

const HomePage = () => {
  const navigate = useNavigate();
  const { apiURL, token } = useContext(RestaurentContext);

  return (
    <>
      <Link to="/add" className="add-food-link">
        Add Food Item
      </Link>
      <ShowMenu />
      <CurrentOrders />
      <PreparedOrder />
    </>
  );
};

export default HomePage;
