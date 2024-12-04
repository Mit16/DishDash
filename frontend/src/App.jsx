import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import FeedbackPopup from "./components/FeedbackPopup/FeedbackPopup";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      {showSignin ? <LoginPopup setShowSignin={setShowSignin} /> : <></>}
      {showFeedback ? (
        <FeedbackPopup setShowFeedback={setShowFeedback} />
      ) : (
        <></>
      )}
      <Navbar setShowSignin={setShowSignin} setShowFeedback={setShowFeedback} />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          {/* <Route path="/feedback" element={<FeedbackPopup />} /> */}
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
