import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateBoard() {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [boardNameValid, setBoardNameValid] = useState(true);
  const [boardDescriptionValid, setBoardDescriptionValid] = useState(true);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCreateBoard = async () => {
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
      const response = await fetch("http://localhost:8050/api/boards/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setBoardName("");
      setBoardDescription("");
    } catch (error) {
      console.error("Failed to create board:", error);
    }

    navigate("/");
  };

  return (
    <div className="create-note">
      <input
        type="text"
        name="boardName"
        placeholder="Enter board name..."
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        className={boardNameValid ? '' : 'invalid'}
      />
      <input
        type="text"
        name="boardDescription"
        placeholder="Enter board description..."
        value={boardDescription}
        onChange={(e) => setBoardDescription(e.target.value)}
        className={boardDescriptionValid ? '' : 'invalid'}
      />
      <button onClick={handleCreateBoard}>Create Board</button>
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  );
}

export default CreateBoard;
