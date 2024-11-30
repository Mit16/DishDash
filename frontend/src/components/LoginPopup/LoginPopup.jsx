import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowSignin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className="signin-popup">
      <form className="signin-popup-container">
        <div className="signin-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowSignin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="signin-popup-inputs">
          {currState === "Sign In" ? (
            <></>
          ) : (
            <input type="text" placeholder="Name" required />
          )}
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {currState === "Sign Up"? <input type="password" placeholder="Confirm Password" required /> : <></>}
          
        </div>
        <button>
          {currState === "Sign Up" ? "Create new account" : "Sign In"}
        </button>
        <div className="signin-popup-condition">
          <input type="checkbox" required />
          <p>Agree to Terms & Conditions</p>
        </div>
        {currState === "Sign In" ? (
          <p>
            Create a new account  |  <span className="cursor-pointer font-semibold" onClick={()=> setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account  |  <span className="cursor-pointer font-semibold" onClick={()=> setCurrState("Sign In")}>Sign In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
