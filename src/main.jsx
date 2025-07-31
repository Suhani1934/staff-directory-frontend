import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from "axios";

// ✅ Set default base URL for all axios requests
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
