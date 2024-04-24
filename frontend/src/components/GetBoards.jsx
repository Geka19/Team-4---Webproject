import React from "react";
import { Link } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";

// For fetching the list of boards
function GetBoard() {
  const { boards } = useBoardContext();

  return (
    <>
      <Link to="/create-board">Create New Board</Link>
      <div
        className="board-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {boards.map((board) => (
          <Link key={board._id} to={`/boards/name/${board.title}`}>
            <div
              className="board-item"
              key={board._id}
              style={{ order: board.isDraft ? -1 : 0 }}
            >
              <h1>{board.title}</h1>
              <p>{board.description}</p>
              {board.isDraft ? (
                <p></p>
              ) : (
                <Link to={`/boards/edit-board/${board._id}`}>Edit Board</Link>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default GetBoard;
