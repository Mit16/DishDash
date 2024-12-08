import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import CurrentEarning from "../../components/CurrentEarning/CurrentEarning";
import ItemsToDeliver from "../../components/ItemsTodeliver/ItemsToDeliver";

const Home = () => {
  return (
    <div>
      <Header />
      <CurrentEarning />
      <ItemsToDeliver />
    </div>
  );
};

export default Home;
