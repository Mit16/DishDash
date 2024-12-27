import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./pages/Home/Home";

import OrdersHistory from "./pages/OrdersHistory/OrdersHistory";
import EarningHistory from "./pages/EarningHistory/EarningHistory";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Other routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<OrdersHistory />} />
        <Route path="/earnings" element={<EarningHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
