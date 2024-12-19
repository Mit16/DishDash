import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowSignin }) => {
  const { URL, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Customer",
  });

  const onChangeSubmitHandler = (event) => {
    const { name, value } = event.target;

    if (name.includes("fullname.")) {
      const key = name.split(".")[1];
      setData((prevData) => ({
        ...prevData,
        fullname: {
          ...prevData.fullname,
          [key]: value,
        },
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
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

  // const signIn = async (credentials) => {
  //   try {
  //     const response = await axiosInstance.post("/api/auth/login", credentials);
  //     if (response.data.success) {
  //       const newToken = response.data.token;
  //       localStorage.setItem("Token", newToken); // Store the token
  //       setToken(newToken); // Update the token state
  //     } else {
  //       alert("Sign-in failed: " + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error signing in:", error);
  //     alert("An error occurred during sign-in.");
  //   }
  // };

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
            <>
              <input
                type="text"
                name="fullname.firstname"
                onChange={onChangeSubmitHandler}
                value={data.fullname.firstname}
                placeholder="Enter first name"
                required
              />
              <input
                type="text"
                name="fullname.lastname"
                onChange={onChangeSubmitHandler}
                value={data.fullname.lastname}
                placeholder="Enter last name"
                required
              />
            </>
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
