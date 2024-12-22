// RestaurantDetails.jsx
import React, { useContext, useEffect } from "react";
import "./RestaurantDetails.css";
import { RestaurentContext } from "../../context/RestaurentContext";
import { useNavigate } from "react-router-dom";

const RestaurantDetails = () => {
  const { restaurantDetails, setUpdateDetails } = useContext(RestaurentContext);
  const navigate = useNavigate();

  if (!restaurantDetails || Object.keys(restaurantDetails).length === 0) {
    return <p>Loading restaurant details...</p>;
  }

  const onUpdateClick = () => {
    navigate("/complete-profile");
  };

  return (
    <div className="restaurant-details">
      <h2>Restaurant Details</h2>

      <div className="detail-section">
        <h3>Full Name</h3>
        {console.log(restaurantDetails)}
        <p>
          {restaurantDetails.fullname.firstname}{" "}
          {restaurantDetails.fullname.lastname}
        </p>
      </div>

      <div className="detail-section">
        <h3>Address</h3>
        <p>
          {restaurantDetails.address.street}, {restaurantDetails.address.city},{" "}
          {restaurantDetails.address.state}, {restaurantDetails.address.zipcode}
          , {restaurantDetails.address.country}
        </p>
      </div>

      <div className="detail-section">
        <h3>Opening Hours</h3>
        <p>
          <strong>Week:</strong> {restaurantDetails.openingHours.week.start} -{" "}
          {restaurantDetails.openingHours.week.end}
        </p>
        <p>
          <strong>Sunday:</strong> {restaurantDetails.openingHours.Sunday.start}{" "}
          - {restaurantDetails.openingHours.Sunday.end}
        </p>
      </div>

      <div className="detail-section">
        <h3>Contact Information</h3>
        <p>
          <strong>Email:</strong> {restaurantDetails.email}
        </p>
        <p>
          <strong>Phone:</strong> {restaurantDetails.phone}
        </p>
      </div>

      <div className="detail-section">
        <h3>Other Details</h3>
        <p>
          <strong>License Number:</strong> {restaurantDetails.licenseNumber}
        </p>
        <p>
          <strong>Account Type:</strong> {restaurantDetails.accountType}
        </p>
        <p>
          <strong>Active:</strong> {restaurantDetails.isActive ? "Yes" : "No"}
        </p>
        <p>
          <strong>Profile Completed:</strong>{" "}
          {restaurantDetails.profileCompleted ? "Yes" : "No"}
        </p>
      </div>

      <div className="detail-section">
        <h3>MetarestaurantDetails</h3>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(restaurantDetails.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(restaurantDetails.updatedAt).toLocaleString()}
        </p>
      </div>

      <button
        className="update-button"
        onClick={() => {
          onUpdateClick();
          setUpdateDetails(true);
        }}
      >
        Update Details
      </button>
    </div>
  );
};

export default RestaurantDetails;
