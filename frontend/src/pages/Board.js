import React from "react";
import "../styles/Board.css";

function Board() {
  return (
    <div>
      <h1>Here are your boards!</h1>
      <main className="board-container">
        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Drafts</h2>
          <p>Here are your recent drafts</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Recycling and Waste Management</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Conservation Efforts</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Sustainable Transport Solutions</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Climate Change Research</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Sustainable Agriculture Practices</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Sustainable Transport Solutions</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Climate Change Research</p>
        </section>

        <section className="board-item">
          {/* Add the board item here (from database) */}
          <h2>Board</h2>
          <p>Sustainable Agriculture Practices</p>
        </section>
      </main>
    </div>
  );
}

export default Board;
