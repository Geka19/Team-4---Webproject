import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { toast } from "react-toastify";
import GoBackButton from "./HandleGoBack";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CreateBoard.css";

// For creating the board
function CreateBoard() {
  const { addBoard } = useBoardContext();
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [boardNameValid, setBoardNameValid] = useState(true);
  const [boardDescriptionValid, setBoardDescriptionValid] = useState(true);

  // Navigate back to the the boards if request succesful
  const navigate = useNavigate();

  // For creating a new board
  const handleCreateBoard = async (event) => {
    event.preventDefault();

    // Validate the input fields before sending a create board request
    setBoardNameValid(!!boardName);
    setBoardDescriptionValid(!!boardDescription);

    // Stop the function if the input fields are invalid
    if (!boardName || !boardDescription) {
      return;
    }

    // Create a new board object
    const newBoard = {
      title: boardName,
      description: boardDescription,
    };

    // Try to create a new board
    // Logic is handled inside the note context
    try {
      // Update the context API state
      await addBoard(newBoard);
      toast.success("Board created successfully"); 
    } catch (error) {
      toast.error("Failed to create board");
      console.error("Failed to create board:", error);
    }

    // Navigate back to the boards page
    navigate(-1);
  };

  // i havent really done any styling so i'm just using the note styling from before
  // Feel free to add styling
  return (
    <form className="create-note" onSubmit={handleCreateBoard}>
      <input
        type="text"
        id="newBoardTitle"
        name="boardName"
        placeholder="Enter board name..."
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        className={boardNameValid ? "" : "invalid"}
      />
      <input
        type="text"
        id="boardDescription"
        name="boardDescription"
        placeholder="Enter board description..."
        value={boardDescription}
        onChange={(e) => setBoardDescription(e.target.value)}
        className={boardDescriptionValid ? "" : "invalid"}
      />
      <button onClick={handleCreateBoard}>Create Board</button>
      <GoBackButton>Go Back</GoBackButton>
    </form>
  );
}

export default CreateBoard;
