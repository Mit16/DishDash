import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { LoginContext } from "../../context/LoginContext";
import axios from "axios";

const LoginPopup = ({ setShowSignin }) => {
  const { URL, setToken } = useContext(LoginContext);

  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeSubmitHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSignIn = async (event) => {
    event.preventDefault();
    let newURL = URL;
    if (currState === "Sign In") {
      newURL += "/api/user/login";
    } else {
      newURL += "/api/user/register";
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      setToken(response.data.token);
      //saving the token in local storage
      localStorage.setItem("Token", response.data.token);
      setShowSignin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="signin-popup">
      <form onSubmit={onSignIn} className="signin-popup-container">
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
            <input
              type="text"
              name="name"
              onChange={onChangeSubmitHandler}
              value={data.name}
              placeholder="Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeSubmitHandler}
            value={data.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeSubmitHandler}
            value={data.password}
            placeholder="Password"
            required
          />
          {currState === "Sign Up" ? (
            <input
              type="password"
              name="confirmPassword"
              onChange={onChangeSubmitHandler}
              value={data.confirmPassword}
              placeholder="Confirm Password"
              required
            />
          ) : (
            <></>
          )}
        </div>
        <div className="signin-popup-condition">
          <input type="checkbox" required />
          <p>Agree to Terms & Conditions</p>
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create new account" : "Sign In"}
        </button>
        {currState === "Sign In" ? (
          <p>
            Create a new account |{" "}
            <span
              className="cursor-pointer font-semibold"
              onClick={() => setCurrState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account |{" "}
            <span
              className="cursor-pointer font-semibold"
              onClick={() => setCurrState("Sign In")}
            >
              Sign In
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
