import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import PopupNote from "../components/PopupNote"; // Import the PopupNote component
import "../styles/App.css";
import "../styles/PopupNote.css"; // Import PopupNote CSS file
import NewsContainer from "../components/NewsContainer";

function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  return (
    <>
      <h1>
        Welcome{" "}
        {currentUser.username.charAt(0).toUpperCase() +
          currentUser.username.slice(1)}
      </h1>
      <p>Welcome to the sustainability diary!</p>
      <NewsContainer />
      <h2>Create a note? (+ img or something)</h2>
      {/* Render the PopupNote component */}
      {isPopupOpen && <PopupNote onClose={handleClosePopup} />}
    </>
  );
}

export default Home;
