import "./FeedbackPopup.css";
import { assets } from "../../assets/assets";

const FeedbackPopup = ({ setShowFeedback }) => {


  return (
    <div className="signin-popup">
      <form className="signin-popup-container">
        <div className="signin-popup-title">
          <h2>Feedback form</h2>
          <img
            onClick={() => setShowFeedback(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="signin-popup-inputs">
          <input type="text" placeholder="Email" required />
          <textarea name="" id="" cols="" rows="5" placeholder="Your Message" required></textarea>
                   
        </div>
        <button>
          Submit
        </button>
        
      </form>
    </div>
  );
};

export default FeedbackPopup;
