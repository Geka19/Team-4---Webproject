import React from 'react';
import '../styles/Footer.css';

// Gets the current year and adds it to the footer
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Boardable. All rights reserved.</p>
    </footer>
  );
};

export default Footer;