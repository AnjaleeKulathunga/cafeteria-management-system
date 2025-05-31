import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import StoreContextProvider from "./components/context/StoreContext"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <StoreContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StoreContextProvider>
  </BrowserRouter>
);
