import React, { useState } from "react";
import PopupNote from "../components/PopupNote"; // Import the PopupNote component
import "../styles/App.css";
import "../styles/PopupNote.css"; // Import PopupNote CSS file

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <h1>Welcome ($name)</h1>
      <p>Welcome to the sustainability diary!</p>

      <div className="homepage-container">
        <div className="recent-boards">
          <h2>Recent Boards</h2>
          {/* Placeholder for recent board items */}
          <ul>
            <li>Board 1</li>
            <li>Board 2</li>
            <li>Board 3</li>
            {/* Add more recent boards as needed */}
          </ul>
        </div>
        {/* Sidebar with News and Recent Boards */}
        <div className="aside">
          {/* Placeholder for News */}
          <div className="news-container">
            <div className="news">
              <h2>News 1</h2>
              <img src="placeholder-image-url" alt="News 1" />
              <p>News 1 text paragraph</p>
            </div>
            <div className="news">
              <h2>News 2</h2>
              <img src="placeholder-image-url" alt="News 2" />
              <p>News 2 text paragraph</p>
            </div>
          </div>

          {/* Placeholder for Recent Boards */}
        </div>
      </div>

      {/* Render the PopupNote component */}
      {isPopupOpen && <PopupNote onClose={handleClosePopup} />}
    </>
  );
}

export default Home;
