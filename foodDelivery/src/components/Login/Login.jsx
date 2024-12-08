import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeliveryProcess, StepsToAccountMaking } from "../LoadOnLogin";

const Login = ({ setCurrentState }) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeSubmitHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    navigate("/home");
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Email : </label> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={onChangeSubmitHandler}
            value={data.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          {/* <label className="block text-gray-700">Password</label> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChangeSubmitHandler}
            value={data.password}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
        <div>
          <p>
            Create a new account |{" "}
            <span
              className="cursor-pointer font-semibold"
              onClick={() => navigate("/register")}
            >
              Click here
            </span>
          </p>
        </div>
      </form>

      {/* Additional componentes just for show */}
      <DeliveryProcess />
      <StepsToAccountMaking />
    </div>
  );
};

export default Login;
