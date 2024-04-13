import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png"; // Replace with your logo if available
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="container-sidebar">
      <nav>
        <ul>
          <li className="logo-item">
            <Link to="/dashboard" className="logo">
              <img src={Logo} alt="Logo" />
              <span className="nav-item">Sustainability Diary</span>
            </Link>
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
            <Link to="/goals">
              <i className="fas fa-tasks"></i>
              <span className="nav-item">Notes Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            <Link to="/tips">
              <i className="fas fa-lightbulb"></i>
              <span className="nav-item">Boards Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
            <Link to="/tips">
              <i className="fas fa-lightbulb"></i>
              <span className="nav-item">Share Page</span>
            </Link>
          </li>

          <li className="nav-link-item">
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