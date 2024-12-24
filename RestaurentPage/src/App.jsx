import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import HomePage from "./pages/HomePage/HomePage";

import ManageFoodItems from "./pages/ManageFoodItems/ManageFoodItems";
import CompleteProfile from "./components/CompleteProfile/CompleteProfile";
import RestaurantDetails from "./pages/RestaurantDetails/RestaurantDetails";
import Navbar from "./Components/Navbar/Navbar";
import AddMenu from "./pages/AddMenu/AddMenu";
import RestaurantOrders from "./pages/RestaurantOrders/RestaurantOrders";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<HomePage />} />
     
        <Route path="/manage-food-items" element={<ManageFoodItems />} />
        <Route path="/update-profile" element={<CompleteProfile />} />
        <Route path="/profile" element={<RestaurantDetails />} />
        <Route path="/add" element={<AddMenu />} />
        <Route path="/restaurant-orders" element={<RestaurantOrders />} />
      </Routes>
    </div>
  );
};

export default App;
