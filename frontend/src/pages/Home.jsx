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
      <h1>Home</h1>
      <p>Welcome to the sustainability diary!</p>
      {/* Render the PopupNote component */}
      {isPopupOpen && <PopupNote onClose={handleClosePopup} />}
    </>
  );
}

export default Home;
