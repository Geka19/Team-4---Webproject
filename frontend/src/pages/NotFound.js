import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Inaccessible.css";
import NotFound_404 from "../assets/img/404.png";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <img src={NotFound_404} alt="Not Found" />
      <h1>404: Page Not Found</h1>
      <p>
        We're sorry, the page you are looking for doesn't exist or has been
        moved.
      </p>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default NotFound;