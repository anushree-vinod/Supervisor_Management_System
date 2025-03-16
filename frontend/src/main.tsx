import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const isProduction = import.meta.env.VITE_ENV === 'production';
const basePath = isProduction ? '/Supervisor_Management_System' : '/';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basePath}> {/*Wrap everything in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
