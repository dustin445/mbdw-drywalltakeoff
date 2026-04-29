import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TakeoffApp from "./app.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TakeoffApp />
  </StrictMode>
);
