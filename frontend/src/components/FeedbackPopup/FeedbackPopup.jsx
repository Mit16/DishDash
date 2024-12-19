import { useState } from "react";
import "./FeedbackPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const FeedbackPopup = ({ setShowFeedback }) => {
  const navigate = useNavigate();

  const { URL } = useContext(StoreContext);

  const [feedbackData, setFeedbackData] = useState({
    email: "",
    feedback: "",
    response: false, // This will indicate whether the user expects a response
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL + "/api/feedback", feedbackData); // Adjust the URL to match your backend
      if (response.data.success) {
        alert("Feedback submitted successfully!");
        setShowFeedback(false);
      } else {
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signin-popup">
      <form className="signin-popup-container" onSubmit={handleSubmit}>
        <div className="signin-popup-title">
          <h2>Feedback Form</h2>
          <img
            onClick={() => {
              setShowFeedback(false);
              navigate("/");
            }}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="signin-popup-inputs">
          <input
            type="email"
            name="email"
            value={feedbackData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <textarea
            name="feedback"
            value={feedbackData.feedback}
            onChange={handleChange}
            cols="30"
            rows="5"
            placeholder="Your Message"
            required
          ></textarea>
          <label className="response-checkbox">
            <input
              type="checkbox"
              name="response"
              checked={feedbackData.response}
              onChange={handleChange}
            />
            Expect a response?
          </label>
        </div>
        <button type="submit" onClick={() => navigate("/")}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackPopup;
