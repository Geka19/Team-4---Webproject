import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import homeIcon from "../assets/img/home.png";
import boardIcon from "../assets/img/board.png";
import profileIcon from "../assets/img/profile.png";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/home">
            <img
              className="icon home"
              src={homeIcon}
              alt="icon for home page"
            />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/boards">
            <img
              id="link-to-boards"
              className="icon board"
              src={boardIcon}
              alt="icon for board page"
            />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/profile">
            <img
              className="icon profile"
              src={profileIcon}
              alt="icon for profile page"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
