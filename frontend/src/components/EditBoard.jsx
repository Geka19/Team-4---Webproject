import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { toast } from "react-toastify";
import GoBackButton from "./HandleGoBack";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

// For editing a board
const EditBoard = () => {
  const [board, setBoard] = useState({ title: "", description: "", tags: [] });
  const { boardId } = useParams();
  const { boards, setBoards } = useBoardContext();

  // Using navigate to go back to the previous page
  const navigate = useNavigate();

  // For changing the board data when the user types in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  // This will get the current board from the database
  // So the user can see what has previously been written in the board
  useEffect(() => {
    const fetchedBoard = boards.find((board) => board._id === boardId);
    if (fetchedBoard) {
      setBoard(fetchedBoard);
    }
  }, [boardId, boards]);

  // For updating the board data
  // This function will be called when the user submits the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the updated board data to the server
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

      // If the request fails, throw an error
      if (!response.ok) {
        throw new Error("Failed to update board");
      }

      // Display a success message to the user
      toast.success("Board Updated");
      navigate(-1);

      // Update the boards context API state
      setBoards((prevBoards) =>
        prevBoards.map((prevBoard) =>
          prevBoard._id === boardId ? { ...prevBoard, ...board } : prevBoard
        )
      );
    } catch (error) {
      // Display an error message to the user
      toast.error(
        error.message || "An error occurred while updating the board"
      );
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
        <button className="edit-board" type="submit">
          Update Board
        </button>
        <GoBackButton>Go Back</GoBackButton>
      </form>
    </div>
  );
};

export default EditBoard;
