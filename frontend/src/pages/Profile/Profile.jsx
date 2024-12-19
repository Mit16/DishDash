import React, { useState } from "react";
import "./Profile.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Profile = () => {
  const { updateProfile, userDetails } = useContext(StoreContext);

  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    zipcode: "",
  });

  const [phoneNumber, setPhoneNumber] = useState({
    phone: {
      phone1: "",
      phone2: "",
    },
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddressData((data) => ({ ...data, [name]: value }));
  };

  const onPhoneChangeHandler = (event) => {
    const { name, value } = event.target;

    setPhoneNumber((prevData) => {
      const updatedPhone = { ...prevData.phone, [name]: value };
      return { phone: updatedPhone };
    });
  };

  const onProfileSubmit = (event) => {
    event.preventDefault();
    updateProfile(phoneNumber, addressData);
  };

  return (
    <div>
      <form onSubmit={onProfileSubmit}>
        <div className="Profile">
          <div>
            <div>
              <h2>Profile Details</h2>
              <p>
                <strong>First Name:</strong> {userDetails.fullname?.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {userDetails.fullname?.lastname}
              </p>
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
            </div>
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street/Area"
                onChange={onChangeHandler}
                value={addressData.street}
                required
                id="street"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={onChangeHandler}
                value={addressData.city}
                required
                id="city"
              />
            </div>
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={addressData.state}
              required
              id="state"
            />
          </div>
          <div>
            <input
              type="text"
              name="district"
              placeholder="District"
              onChange={onChangeHandler}
              value={addressData.district}
              required
              id="district"
            />
            <input
              type="number"
              name="zipcode"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              value={addressData.zipcode}
              required
              id="zipcode"
            />
          </div>
        </div>
        <div>
          <input
            type="text"
            name="phone1"
            placeholder="Phone Number 1"
            onChange={onPhoneChangeHandler}
            value={phoneNumber.phone.phone1}
            required
            id="phoneNumber1"
          />
          <input
            type="text"
            name="phone2"
            placeholder="Phone Number 2"
            onChange={onPhoneChangeHandler}
            value={phoneNumber.phone.phone2}
            required
            id="phoneNumber2"
          />
        </div>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Profile;
