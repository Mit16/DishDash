import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurentContext } from "../../context/RestaurentContext";
import "./CompleteProfile.css";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const {
    restaurantId,
    updateRestaurant,
    updateDetails,
    fetchRestaurantById,
    toggleRestaurantProfileStatus,
    setUpdateDetails,
  } = useContext(RestaurentContext);

  const [profileData, setProfileData] = useState({
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
    if (restaurantId) {
      fetchRestaurantById()
        .then((details) => {
          if (details) {
            setProfileData((prev) => ({
              ...prev,
              ...details, // Merge fetched details into state
            }));
          }
        })
        .catch((error) =>
          console.error("Error fetching details for profile:", error)
        );
    }
  }, [restaurantId]);

  // Fetch existing restaurant details if restaurantId is available
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetchRestaurantById(); // Fetch details by ID
        if (response?.data?.success) {
          const details = response.data.data;
          setProfileData({
            phone: details.phone || "",
            address: {
              street: details.address?.street || "",
              city: details.address?.city || "",
              state: details.address?.state || "",
              zipcode: details.address?.zipcode || "",
              country: details.address?.country || "",
            },
            openingHours: {
              week: {
                start: details.openingHours?.week?.start || "",
                end: details.openingHours?.week?.end || "",
              },
              Sunday: {
                start: details.openingHours?.Sunday?.start || "",
                end: details.openingHours?.Sunday?.end || "",
              },
            },
            licenseNumber: details.licenseNumber || "",
          });
        } else {
          console.error("Failed to fetch restaurant details");
        }
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    // Fetch data if restaurantId exists
    if (restaurantId) {
      fetchRestaurantDetails();
    }
  }, [restaurantId]);

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

  // if (!restaurantId || !profileData) {
  //   return <p>Loading...</p>;
  // }

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
        <>
          <button type="submit" onClick={() => setUpdateDetails(false)}>
            Update Profile
          </button>
        </>
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
