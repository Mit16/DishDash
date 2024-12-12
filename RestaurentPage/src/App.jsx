import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import ManageFoodItems from "./components/ManageFoodItems/ManageFoodItems";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/manage-food-items" element={<ManageFoodItems />} />
      </Routes>
    </div>
  );
};

export default App;
