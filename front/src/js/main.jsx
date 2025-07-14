import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../css/index.css";
import App from "./App.jsx";
import { UserBar } from "./userBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserBar />
    <App />
  </StrictMode>,
);
