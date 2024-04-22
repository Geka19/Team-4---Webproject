import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function GetBoard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoards() {
      const response = await fetch("http://localhost:8050/api/boards/");
      const data = await response.json();
      setBoards(data);
      setLoading(false);
    }
    fetchBoards();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link to="/create-board">Create New Board</Link>
      <div className="board-container">
        {boards.map((board) => (
          <Link to={`/boards/name/${board.title}`} key={board._id}>
            <div className="board-item" key={board._id}>
              <h1>{board.title}</h1>
              <p>{board.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default GetBoard;
