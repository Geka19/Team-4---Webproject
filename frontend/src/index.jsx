import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

// render the App component inside the Router component to enable routing as a single-page application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();

// learning resources:
// react-router: https://www.youtube.com/watch?v=oTIJunBa6MA&ab_channel=CosdenSolutions
