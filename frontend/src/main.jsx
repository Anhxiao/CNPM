import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./assets/styles/reset.css";
import "./assets/styles/variables.css";
import "./assets/styles/global.css";
import "./assets/styles/index.css";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);