import React from "react";
import "../styles/Board.css";

function Home() {
  return (
    <main className="board-container">
      <section className="welcome">
        <h1>Welcome to the Sustainability Diary!</h1>
        <p>
          Write down what you see about sustainability through diary entries.
          Share your diary with fellow classmates and get a better understanding
          of sustainability
        </p>
      </section>

      <section className="board-item">
        <h2>Board</h2>
        <p>
          This is where you can see all the notes you have written down. You can
          also add new notes and delete existing notes.
        </p>
      </section>
    </main>
  );
}

export default Home;
