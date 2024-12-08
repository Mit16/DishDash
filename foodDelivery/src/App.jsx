import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import OrdersHistory from "./pages/OrdersHistory/OrdersHistory";
import EarningHistory from "./pages/EarningHistory/EarningHistory";
import { useState } from "react";

const App = () => {
  const [currentState, setCurrentState] = useState(false); // True = Login, False = Register

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setCurrentState={setCurrentState} />}
        />
        <Route
          path="/register"
          element={<Register setCurrentState={setCurrentState} />}
        />

        {/* Other routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersHistory />} />
        <Route path="/earnings" element={<EarningHistory />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
