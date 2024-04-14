import React, { useState } from 'react';
import '../styles/Home.css';
import Opening from '../components/OpenNotes.js'; // Adjust the path as needed

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
      <div>
      
      </div>
      <main className="home-container">
        <section className="welcome">
          <h1>Welcome to the Sustainability Diary!</h1>
          <p>
            Write down what you see about sustainability through diary entries.
            Share your diary with fellow classmates and get a better
            understanding of sustainability
          </p>

          <button onClick={handleOpenModal}>Open Modal</button>

          {isOpeningModal && <Opening onClose={handleCloseModal} />}
        </section>
      </main>
    </div>
  );
}

export default Home;
