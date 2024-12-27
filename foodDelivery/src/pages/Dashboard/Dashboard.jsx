import React, { useEffect, useState } from "react";
// import { fetchDeliveryGuyDetails } from "../../context/Delivery.context";
import "./Dashboard.css";
import { useContext } from "react";
import { DeliveryContext } from "../../context/Delivery.context";

const Dashboard = () => {
  const [deliveryGuyDetails, setDeliveryGuyDetails] = useState(null);
  const { fetchDeliveryGuyDetails } = useContext(DeliveryContext);
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchDeliveryGuyDetails();
      if (details) setDeliveryGuyDetails(details);
    };

    fetchDetails();
  }, []);

  if (!deliveryGuyDetails) {
    return <p>Loading...</p>;
  }

  const {
    fullname,
    accountType,
    email,
    phoneNumber,
    dateOfBirth,
    gender,
    street,
    city,
    state,
    zipcode,
    vehicleType,
    vehicleNumber,
    totalEarnings,
    deliveryArea,
    profileCompleted,
  } = deliveryGuyDetails;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="profile-section">
        <h2>Profile Information</h2>
        <p>
          <strong>Full Name:</strong> {fullname.firstname} {fullname.lastname}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p>
          <strong>Date of Birth:</strong> {new Date(dateOfBirth).toDateString()}
        </p>
        <p>
          <strong>Gender:</strong> {gender ? "Male" : "Female"}
        </p>
        <p>
          <strong>Address:</strong> {`${street}, ${city}, ${state}, ${zipcode}`}
        </p>
        <p>
          <strong>Delivery Area:</strong> {deliveryArea}
        </p>
        <p>
          <strong>Profile Completed:</strong> {profileCompleted ? "Yes" : "No"}
        </p>
      </div>
      <div className="vehicle-section">
        <h2>Vehicle Information</h2>
        <p>
          <strong>Vehicle Type:</strong> {vehicleType}
        </p>
        <p>
          <strong>Vehicle Number:</strong> {vehicleNumber}
        </p>
      </div>
      <div className="earnings-section">
        <h2>Earnings</h2>
        <p>
          <strong>Total Earnings:</strong> ₹{totalEarnings}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
