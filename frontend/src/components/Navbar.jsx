import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/svg/newNote.svg";
import "../styles/Navbar.css";

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
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo1" />
        </Link>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo2" />
        </Link>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo3" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
