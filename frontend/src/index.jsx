import React from "react";
import ReactDOM from "react-dom"; // Change the import statement
import "./styles/index.css";

// Render the App component inside the Router component to enable routing as a single-page application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
