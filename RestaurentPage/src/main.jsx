import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import {
  MenuContextProvider,
  OrderContextProvider,
  RestaurantContextProvider,
} from "./context/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RestaurantContextProvider>
        <MenuContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </MenuContextProvider>
      </RestaurantContextProvider>
    </BrowserRouter>
  </StrictMode>
);
