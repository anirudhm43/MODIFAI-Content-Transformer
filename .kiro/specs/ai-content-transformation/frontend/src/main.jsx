import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Amplify } from "aws-amplify";
import awsconfig from "./awsConfig.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HistoryPage from "./HistoryPage.jsx";
Amplify.configure(awsconfig);


console.log("React is mounting...");


ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);