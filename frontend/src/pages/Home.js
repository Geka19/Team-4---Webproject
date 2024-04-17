import React, { useState } from "react";
import "../styles/Home.css";
import Opening from "../components/OpenNotes.js";
import GetNotes from "../components/getNotes.js";

const Home = () => {
  const [isOpeningModal, setIsOpeningModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpeningModal(true);
  };

  const handleCloseModal = () => {
    setIsOpeningModal(false);
  };

  return (
    <div>
      <main className="home-container">
        <div className="welcome">
          <h1>Welcome to the Sustainability Diary!</h1>
          <p>
            Write down what you see about sustainability through diary entries.
            Share your diary with fellow classmates and get a better
            understanding of sustainability
          </p>

          <button onClick={handleOpenModal}>Open Modal</button>
          {isOpeningModal && <Opening onClose={handleCloseModal} />}
        </div>

        <h2 className="header-notes">Recently Made Notes:</h2>
          {/* Gets all notes from the api */}
          <GetNotes />
      </main>
    </div>
  );
};

export default Home;
