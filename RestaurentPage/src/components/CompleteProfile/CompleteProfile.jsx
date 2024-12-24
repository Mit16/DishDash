import React, { useContext, useState, useEffect } from "react";
import "./CompleteProfile.css";
import { RestaurentContext } from "../../context/RestaurentContext";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const {
    updateRestaurant,
    updateDetails,
    toggleRestaurantProfileStatus,
    setUpdateDetails,
    restaurantDetails,
  } = useContext(RestaurentContext);

  const [profileData, setProfileData] = useState({
    restaurentName: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    openingHours: {
      week: { start: "", end: "" },
      Sunday: { start: "", end: "" },
    },
    licenseNumber: "",
  });

  // Use `fetchRestaurantById` in `useEffect`:
  useEffect(() => {
    if (updateDetails && restaurantDetails) {
      setProfileData({
        restaurentName: restaurantDetails.restaurentName || "",
        phone: restaurantDetails.phone || "",
        address: {
          street: restaurantDetails.address?.street || "",
          city: restaurantDetails.address?.city || "",
          state: restaurantDetails.address?.state || "",
          zipcode: restaurantDetails.address?.zipcode || "",
          country: restaurantDetails.address?.country || "",
        },
        openingHours: {
          week: {
            start: restaurantDetails.openingHours?.week?.start || "",
            end: restaurantDetails.openingHours?.week?.end || "",
          },
          Sunday: {
            start: restaurantDetails.openingHours?.Sunday?.start || "",
            end: restaurantDetails.openingHours?.Sunday?.end || "",
          },
        },
        licenseNumber: restaurantDetails.licenseNumber || "",
      });
    }
  }, [updateDetails, restaurantDetails]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [key]: value,
        },
      }));
    } else if (name.startsWith("openingHours.")) {
      const [, day, key] = name.split(".");
      setProfileData((prevData) => ({
        ...prevData,
        openingHours: {
          ...prevData.openingHours,
          [day]: { ...prevData.openingHours[day], [key]: value },
        },
      }));
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateRestaurant(profileData);
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message);
      }

      const status = await toggleRestaurantProfileStatus();
      if (status.success) {
        alert("Profile activated successfully!");
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-container">
      {updateDetails ? (
        <></>
      ) : (
        <input
          type="text"
          name="restaurentName"
          placeholder="Restaurent Name"
          value={profileData.restaurentName || "N/A"}
          onChange={handleChange}
          required
        />
      )}

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={profileData.phone || "N/A"}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address.street"
        placeholder="Street"
        value={profileData.address?.street || "N/A"}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.city"
        placeholder="City"
        value={profileData.address?.city || "N/A"}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.state"
        placeholder="State"
        value={profileData.address?.state || "N/A"}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.zipcode"
        placeholder="Zipcode"
        value={profileData.address?.zipcode || "N/A"}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address.country"
        placeholder="Country"
        value={profileData.address?.country || "N/A"}
        onChange={handleChange}
      />

      {/* Opening Hours - Week */}
      <label>Opening Hours (Week):</label>
      <input
        type="time"
        name="openingHours.week.start"
        placeholder="Start Time"
        value={profileData.openingHours.week.start}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="openingHours.week.end"
        placeholder="End Time"
        value={profileData.openingHours.week.end}
        onChange={handleChange}
        required
      />

      {/* Opening Hours - Sunday */}
      <label>Opening Hours (Sunday):</label>
      <input
        type="time"
        name="openingHours.Sunday.start"
        placeholder="Start Time"
        value={profileData.openingHours.Sunday.start}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="openingHours.Sunday.end"
        placeholder="End Time"
        value={profileData.openingHours.Sunday.end}
        onChange={handleChange}
        required
      />
      {updateDetails ? (
        <div className="button-group">
          <button type="submit" onClick={() => setUpdateDetails(false)}>
            Update Profile
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={profileData.licenseNumber}
            onChange={handleChange}
            required
          />
          <button type="submit">Complete Profile</button>
        </>
      )}
    </form>
  );
};

export default CompleteProfile;
