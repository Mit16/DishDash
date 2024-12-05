import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Feedback = ({ apiURL }) => {
  const [feedback, setFeedback] = useState([]);

  const getFeedbacks = async () => {
    const response = await axios.get(apiURL + "/api/feedback/");
    if (response.data.success) {
      setFeedback(response.data.feedbacks);
      console.log(response.data.feedbacks);
    } else {
      toast.error("Unable to get feedback");
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <div className="feedback">
      <h3>Feedbacks</h3>
      <div className="feedback-list">
        {feedback.map((item, index) => {
          const createdDate = new Date(item.createdAt);
          const date = createdDate.toLocaleDateString(); // Format: MM/DD/YYYY or DD/MM/YYYY based on locale
          const time = createdDate.toLocaleTimeString(); // Format: HH:MM:SS AM/PM

          return (
            <div key={index}>
              <p>Date: {date}</p>
              <p>Time: {time}</p>
              <p>Email: {item.email}</p>
              <p>Feedback: {item.feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;
