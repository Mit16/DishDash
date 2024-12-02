import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "dotenv/config";

const App = () => {
  const URL = import.meta.env.ADMIN_PAGE_URL;

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add URL={URL} />} />
          <Route path="/list" element={<List URL={URL} />} />
          <Route path="/orders" element={<Orders URL={URL} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
