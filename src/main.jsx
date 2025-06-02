import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <div className="outside-banner">
 <h1>수의 음식 머신</h1>
      <hr className="divider" />
      <p>재료를 조합하여 맛있는 음식을 만들어보자</p>
      </div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
