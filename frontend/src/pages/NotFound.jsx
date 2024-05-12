import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound_404 from "../assets/img/404.png";
import "../styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <img src={NotFound_404} alt="Not Found" />
      <h1>404: Page Not Found</h1>
      <p>
        We're sorry, but the page you are looking for doesn't exist or has been
        moved.
      </p>
      <button onClick={() => navigate("/home")}>Go Home</button>
    </div>
  );
}

export default NotFound;
