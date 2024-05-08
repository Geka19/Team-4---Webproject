import React, { useState } from "react";
import PopupNote from "../components/PopupNote"; // Import the PopupNote component
import "../styles/App.css";
import "../styles/PopupNote.css";

function Home() {
  const [showPopup, setShowPopup] = useState(false); // State to control the popup display

  // Function to toggle the popup display
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the sustainability diary!</p>
      <PopupNote showPopup={showPopup} togglePopup={togglePopup} />{" "}
      {/* Render the PopupNote component */}
    </>
  );
}

export default Home;
