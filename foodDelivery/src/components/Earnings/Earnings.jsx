import React, { useEffect, useState } from "react";
import { DeliveryContext } from "../../context/Delivery.context";
import "./Earnings.css";
import { useContext } from "react";

const Earnings = () => {
  const [totalEarnings, setTotalEarnings] = useState(null);
  const { fetchEarnings } = useContext(DeliveryContext);

  useEffect(() => {
    const getEarnings = async () => {
      const earnings = await fetchEarnings();
      setTotalEarnings(earnings);
    };

    getEarnings();
  }, []);

  if (totalEarnings === null) {
    return <p>Loading earnings...</p>;
  }

  return (
    <div className="earnings-container">
      <h1>Earnings</h1>
      <div className="earnings-card">
        <h2>Total Earnings</h2>
        <p>₹{totalEarnings}</p>
      </div>
    </div>
  );
};

export default Earnings;
