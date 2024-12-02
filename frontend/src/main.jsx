import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./context/StoreContext.jsx";
import LoginContextProvider from "./context/LoginContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <StoreContextProvider>
    <LoginContextProvider>
      <App />
      </LoginContextProvider>
      </StoreContextProvider>
    </BrowserRouter>
  </StrictMode>
);
