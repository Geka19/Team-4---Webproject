import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import "../styles/App.css";

// For editing a board
const EditBoard = () => {
  const [board, setBoard] = useState({ title: "", description: "", tags: [] });
  const { boardId } = useParams();
  const { boards, setBoards } = useBoardContext();
  
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/boards");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchedBoard = boards.find((board) => board._id === boardId);
    if (fetchedBoard) {
      setBoard(fetchedBoard);
    }
  }, [boardId, boards]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8050/api/boards/${boardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(board),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update board");
      }

      // Update the boards context API state
      setBoards((prevBoards) =>
        prevBoards.map((prevBoard) =>
          prevBoard._id === boardId ? { ...prevBoard, ...board } : prevBoard
        )
      );

      // navigate to previous page when board is updated
      navigate("/boards");
    } catch (error) {
      console.error(error);
    }
  };

  // Reusing the note styling for the edit board component as well
  return (
    <div className="note">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={board.title}
            onChange={handleChange}
            className="note-title"
            data-testid="title-input"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={board.description}
            onChange={handleChange}
            className="note-content"
            data-testid="description-textarea"
          />
        </label>
        <button className="edit-board" type="submit">Update Board</button>
        <button onClick={handleGoBack}>Go Back</button>
      </form>
    </div>
  );
};

export default EditBoard;
