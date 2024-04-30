import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import "../styles/CreateBoard.css";

// For creating the board
function CreateBoard() {
  const { addBoard } = useBoardContext();
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [boardNameValid, setBoardNameValid] = useState(true);
  const [boardDescriptionValid, setBoardDescriptionValid] = useState(true);

  // Navigate back to the last page the user was on
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    event.preventDefault();

    navigate("/boards");
  };

  // For creating a new board
  const handleCreateBoard = async (event) => {
    event.preventDefault();

    setBoardNameValid(!!boardName);
    setBoardDescriptionValid(!!boardDescription);

    if (!boardName || !boardDescription) {
      return;
    }

    const newBoard = {
      title: boardName,
      description: boardDescription,
    };

    try {
      // Update the context API state
      await addBoard(newBoard);
    } catch (error) {
      console.error("Failed to create board:", error);
    }

    navigate("/boards");
  };

  // i havent really done any styling so i'm just using the note styling from before
  return (
    <form className="create-note" onSubmit={handleCreateBoard}>
      <input
        type="text"
        name="boardName"
        placeholder="Enter board name..."
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        className={boardNameValid ? "" : "invalid"}
      />
      <input
        type="text"
        name="boardDescription"
        placeholder="Enter board description..."
        value={boardDescription}
        onChange={(e) => setBoardDescription(e.target.value)}
        className={boardDescriptionValid ? "" : "invalid"}
      />
      <button onClick={handleCreateBoard}>Create Board</button>
      <button onClick={handleGoBack}>Go Back</button>
    </form>
  );
}

export default CreateBoard;
