import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import DeliveryContextProvider from "./context/Delivery.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <DeliveryContextProvider>
        <App />
      </DeliveryContextProvider>
    </BrowserRouter>
  </StrictMode>
);
