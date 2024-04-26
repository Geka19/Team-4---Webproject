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
          <div
            className="board-item"
            key={board._id}
            style={{ order: board.isDraft ? -1 : 0 }}
          >
            <Link key={board._id} to={`/boards/name/${board.title}`}>
              <h1>{board.title}</h1>
              <p>{board.description}</p>
            </Link>
            {!board.isDraft && (
              <Link to={`/boards/edit-board/${board._id}`}>Edit Board</Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default GetBoard;
