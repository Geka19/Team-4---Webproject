import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import "../styles/Sidebar.css";

// Sidebar component
function Sidebar() {
  return (
    <div className="container-sidebar">
      <nav>
        <ul>
          <li className="logo-item">
            <div className="logo">
              <img src={Logo} alt="Logo" />
              <span className="nav-item">Sustainability Diary</span>
            </div>
          </li>

          <li className="nav-link-item">
            <Link to="/">
              <i className="fas fa-home"></i>
              <span className="nav-item">Opening Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            <Link to="/home">
              <i className="fas fa-book-open"></i>
              <span className="nav-item">Home Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            <Link to="/board">
              <i className="fas fa-tasks"></i>
              <span className="nav-item">Board Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            {/* Add the link to the Note Page here */}
            <Link to="/notes">
              <i className="fas fa-lightbulb"></i>
              <span className="nav-item">Notes Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
             {/* Add the link to the Share Page here */}
            <Link to="/">
              <i className="fas fa-lightbulb"></i>
              <span className="nav-item">Share Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            {/* Add the link to the settings Page here */}
            <Link to="/tips">
              <i className="fas fa-lightbulb"></i>
              <span className="nav-item">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;