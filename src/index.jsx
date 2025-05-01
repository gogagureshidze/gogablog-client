import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/userContext";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
