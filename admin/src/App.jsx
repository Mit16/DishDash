import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "dotenv/config";

const App = () => {
  // const URL = import.meta.env.VITE_ADMIN_PAGE_URL;
  const apiURL = import.meta.env.VITE_ADMIN_PAGE_URL; // Access environment variable
  

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add apiURL={apiURL} />} />
          <Route path="/list" element={<List apiURL={apiURL} />} />
          <Route path="/orders" element={<Orders apiURL={apiURL} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
