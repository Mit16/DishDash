import "./Dashboard.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { DeliveryContext } from "../../context/Delivery.context";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "../../context/axiosConfig";

const Dashboard = () => {
  const [deliveryId, SetDeliveryID] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // To toggle edit mode
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const { apiURL, token } = useContext(DeliveryContext);

  const [updatedDetails, setUpdatedDetails] = useState({
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

  // Fetch user details
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const response = await axiosInstance.get(
  //         "/api/delivery/dashboard/details"
  //       );

  //       if (response.data.success) {
  //         setUserDetails(response.data.data);
  //         setUpdatedDetails(response.data.data); // Set as initial data for updates
  //       } else {
  //         toast.error(response.data.message || "Failed to fetch details.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching details:", error);
  //       toast.error("An error occurred while fetching details.");
  //     }
  //   };

  //   if (token) {
  //     fetchDetails();
  //   }
  // }, [token]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatedDetails((data) => ({ ...data, [name]: value }));
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();
    generateDeliveryID();

    try {
      // Send the data to the backend
      const response = await axiosInstance.post("/api/delivery/updateDetails", {
        updateData: updatedDetails,
      });

      if (response.data.success) {
        toast.success("Details updated successfully!");
        setUserDetails(updatedDetails); // Update the local state
        setIsEditable(false); // Disable edit mode
        setIsPopupOpen(true); // Show success popup
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
        <div className="Dashboard">
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
              value={updatedDetails.dateOfBirth}
              required
              id="dateOfBirth"
            />
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={updatedDetails.gender === "Male"}
                  onChange={onChangeHandler}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={updatedDetails.gender === "Female"}
                  onChange={onChangeHandler}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Others"
                  checked={updatedDetails.gender === "Others"}
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
              value={updatedDetails.phoneNumber}
              required
              id="phoneNumber"
            />
            <div>
              <input
                type="text"
                name="street"
                placeholder="Street/Area"
                onChange={onChangeHandler}
                value={updatedDetails.street}
                required
                id="street"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={onChangeHandler}
                value={updatedDetails.city}
                required
                id="city"
              />
            </div>
            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={onChangeHandler}
              value={updatedDetails.state}
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
              value={updatedDetails.district}
              required
              id="district"
            />
            <input
              type="number"
              name="zipcode"
              placeholder="Zip Code"
              onChange={onChangeHandler}
              value={updatedDetails.zipcode}
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
                  value={updatedDetails.govId}
                  id="govId"
                />
                <div>
                  Driving License :
                  <input
                    type="text"
                    name="drivingLicense"
                    placeholder="Driving License Number"
                    onChange={onChangeHandler}
                    value={updatedDetails.drivingLicense}
                    id="deivingLicense"
                  />
                </div>
              </div>
              <select
                name="vehicleType"
                id="vehicle"
                onChange={onChangeHandler}
                value={updatedDetails.vehicleType}
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
                value={updatedDetails.vehicleNumber}
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
                  checked={updatedDetails.vehicleInsurance === "Yes"}
                  onChange={onChangeHandler}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="vehicleInsurance"
                  value="No"
                  checked={updatedDetails.vehicleInsurance === "No"}
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
              value={updatedDetails.bankName}
              id=""
            />
            <div>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                onChange={onChangeHandler}
                value={updatedDetails.accountNumber}
                id=""
              />
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                onChange={onChangeHandler}
                value={updatedDetails.accountHolderName}
                id=""
              />
            </div>
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              onChange={onChangeHandler}
              value={updatedDetails.ifscCode}
              id=""
            />
          </div>
          <div>
            <input
              type="text"
              name="deliveryArea"
              placeholder="Prefered delivery area"
              onChange={onChangeHandler}
              value={updatedDetails.deliveryArea}
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
