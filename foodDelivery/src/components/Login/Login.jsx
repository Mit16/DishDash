import { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeliveryProcess, StepsToAccountMaking } from "../LoadOnLogin";
import { DeliveryContext } from "../../context/Delivery.context";

const Login = () => {
  const navigate = useNavigate();

  const { apiURL, setToken, Signin } = useContext(DeliveryContext);
  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "DeliveryAgent",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    let newURL = apiURL;
    if (currState === "Sign In") {
      newURL += "/api/delivery/login";
    } else {
      newURL += "/api/delivery/register";
    }

    const response = await axios.post(newURL, data);

    if (response.data.success) {
      // localStorage.setItem("Token", response.data.token); //saving the token in local storage
      // setToken(response.data.token);
      Signin(response.data.token);
    } else {
      alert(response.data.message);
    }

    if (response.data.success) {
      navigate("/dashboard");
    } else {
      setCurrState("Sign Up");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="signin-popup-container">
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
      {/* Additional componentes just for show */}
      <DeliveryProcess />
      <StepsToAccountMaking />
    </div>
  );
};

export default Login;
