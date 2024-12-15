import "./Dashboard.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { DeliveryContext } from "../../context/Delivery.context";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [deliveryId, SetDeliveryID] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const { apiURL } = useContext(DeliveryContext);

  const [registerData, setRegisterData] = useState({
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    street: "",
    city: "",
    district: "",
    state: "",
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

    try {
      // Add the delivery ID to the data
      const dataToSend = { ...registerData, deliveryId };

      // Send the data to the backend
      const response = await axios.post(
        `${apiURL}/api/delivery/updateDetails`,
        {
          updateData: dataToSend,
          userId: localStorage.getItem("userId"), // Assuming userId is stored in localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`, // Add token for authentication
          },
        }
      );

      if (response.data.success) {
        toast.success("Details updated successfully!");
        setIsPopupOpen(true); // Show the success popup
      } else {
        toast.error(response.data.message || "Failed to update details.");
      }
    } catch (error) {
      console.error("Error updating delivery details:", error);
      toast.error("Error updating details. Please try again.");
    }
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
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={onChangeHandler}
              value={registerData.dateOfBirth}
              required
              id="dateOfBirth"
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={registerData.gender === "Male"}
                  onChange={onChangeHandler}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={registerData.gender === "Female"}
                  onChange={onChangeHandler}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  checked={registerData.gender === "Others"}
                  onChange={onChangeHandler}
                />
                Others
              </label>
            </div>
          </div>
          <div>
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
            <div>
              <div>
                <input
                  type="text"
                  name="govId"
                  placeholder="Government Identity"
                  onChange={onChangeHandler}
                  value={registerData.govId}
                  id="govId"
                />
                <div>
                  Driving License :
                  <input
                    type="text"
                    name="drivingLicense"
                    placeholder="Driving License Number"
                    onChange={onChangeHandler}
                    value={registerData.drivingLicense}
                    id="deivingLicense"
                  />
                </div>
              </div>
              <select
                name="vehicleType"
                id="vehicle"
                onChange={onChangeHandler}
                value={registerData.vehicleType}
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
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="vehicleInsurance"
                  value="Yes"
                  checked={registerData.vehicleInsurance === "Yes"}
                  onChange={onChangeHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="vehicleInsurance"
                  value="No"
                  checked={registerData.vehicleInsurance === "No"}
                  onChange={onChangeHandler}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              onChange={onChangeHandler}
              value={registerData.bankName}
              id=""
            />
            <div>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                onChange={onChangeHandler}
                value={registerData.accountNumber}
                id=""
              />
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                onChange={onChangeHandler}
                value={registerData.accountHolderName}
                id=""
              />
            </div>
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              onChange={onChangeHandler}
              value={registerData.ifscCode}
              id=""
            />
          </div>
          <div>
            <input
              type="text"
              name="deliveryArea"
              placeholder="Prefered delivery area"
              onChange={onChangeHandler}
              value={registerData.deliveryArea}
              id=""
            />
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
