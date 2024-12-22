
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./pages/HomePage/HomePage";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import ManageFoodItems from "./components/ManageFoodItems/ManageFoodItems";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails";
import Navbar from "./Components/Navbar/Navbar";
import AddMenu from "./pages/AddMenu/AddMenu";

const App = () => {
  
  return (
    <div>
      <Navbar  />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/manage-food-items" element={<ManageFoodItems />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/profile" element={<RestaurantDetails />} />
        <Route path="/add" element={<AddMenu />} />
      </Routes>
    </div>
  );
};

export default App;
