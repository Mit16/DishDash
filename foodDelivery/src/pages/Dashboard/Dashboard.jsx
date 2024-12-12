import React from "react";
import "./Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { DeliveryContext } from "../../context/Delivery.context";

const Dashboard = () => {
  const [deliveryId, SetDeliveryID] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const { setToken, apiURL } = useContext(DeliveryContext);

  const [registerData, setRegisterData] = useState({
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",   
    street: "",
    city: "",
    state: "",
    district: "",
    zipcode: "",
    govId: "",
    drivingLicense: "",
    vehicleType: "",
    vehicleNumber: "",
    vehicleInsurance: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    deliveryArea: "",
    deliveryId: "",
  });

  const generateDeliveryID = () => {
    let tempID = "D-";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i <= 12; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      tempID += str.charAt(char);
    }

    SetDeliveryID(tempID);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    navigate("/login"); // Navigate to login after closing the popup
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterData((data) => ({ ...data, [name]: value }));
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    generateDeliveryID();
    setIsPopupOpen(true);
  };

  return (
    <>
      <form onSubmit={handleRegisterClick}>
        <div className="Register">
          {/* <input
          type="text"
          name="deliveryId"
          contentEditable="false"
          readOnly
          id=""
        /> */}
          <div>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={onChangeHandler}
              value={registerData.firstname}
              required
              id="firstname"
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={onChangeHandler}
              value={registerData.lastname}
              required
              id="lastname"
            />
          </div>
          <div>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={onChangeHandler}
              value={registerData.dateOfBirth}
              required
              id="dateOfBirth"
            />
            <input
              type="number"
              name="age"
              onChange={onChangeHandler}
              value={registerData.age}
              required
              placeholder="Age"
              id="age"
            />
          </div>
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={registerData.email}
            required
            placeholder="Email"
            id="email"
          />
          <input
            type="password"
            min={8}
            name="password"
            placeholder="Password"
            onChange={onChangeHandler}
            value={registerData.password}
            required
            id="password"
          />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            min={7}
            onChange={onChangeHandler}
            value={registerData.confirmpassword}
            required
            id="confirmpassword"
          />
          <div>
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street/Area"
                onChange={onChangeHandler}
                value={registerData.street}
                required
                id="street"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={onChangeHandler}
                value={registerData.city}
                required
                id="city"
              />
            </div>
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={registerData.state}
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
              value={registerData.district}
              required
              id="district"
            />
            <input
              type="number"
              name="zipcode"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              value={registerData.zipcode}
              required
              id="zipcode"
            />
          </div>
          <div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={onChangeHandler}
              value={registerData.country}
              required
              id="country"
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              min={10}
              onChange={onChangeHandler}
              value={registerData.phoneNumber}
              required
              id="phoneNumber"
            />
          </div>
          <select
            name="vehicle"
            id="vehicle"
            onChange={onChangeHandler}
            value={registerData.vehicle}
          >
            <option value="">--Select--</option>
            <option value="Bike">Bike</option>
            <option value="Bicycle">Bicycle</option>
            <option value="Car">Car</option>
            <option value="Scooter">Scooter</option>
            <option value="Truck">Truck</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="text"
            name="vehicleNumber"
            placeholder="XX-12-XX-1234"
            onChange={onChangeHandler}
            value={registerData.vehicleNumber}
            required
            id="vehicleNumber"
          />

          <div>
            <label>
              <input
                type="radio"
                name="yesNo"
                value="Yes"
                checked={registerData.vehicleInsurance === "Yes"}
                onChange={onChangeHandler}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="yesNo"
                value="No"
                checked={registerData.vehicleInsurance === "No"}
                onChange={onChangeHandler}
              />
              No
            </label>
          </div>

          <div className="signin-popup-condition">
            <input type="checkbox" required />
            <p>Agree to Terms & Conditions</p>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <Popup open={isPopupOpen} onClose={closePopup} modal nested>
        <div className="modal">
          <div className="content">
            Your Delivery ID is: <strong>{deliveryId}</strong>
            <h3>Congratulations 🎉</h3>
          </div>
          <div>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      </Popup>

      <hr />
    </>
  );
};

export default Dashboard;
