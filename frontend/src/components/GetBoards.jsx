import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// For fetching the list of boards
function GetBoard() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the list of boards from the server
  useEffect(() => {
    async function fetchBoards() {
      const response = await fetch("http://localhost:8050/api/boards/");
      const data = await response.json();
      setBoards(data);
      setLoading(false);
    }
    fetchBoards();
  }, []);

  // Display a loading message while the list of boards is being fetched
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link to="/create-board">Create New Board</Link>
      <div className="board-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {boards.map((board) => (
          <Link to={`/boards/name/${board.title}`} key={board._id}>
            <div className="board-item" key={board._id} style={{ order: board.isDraft ? -1 : 0 }}>
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
