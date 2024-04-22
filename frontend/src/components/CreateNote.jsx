import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// For creating a new note
function CreateNote() {
  const [boardName, setBoardName] = useState("");
  const [existingBoards, setExistingBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  // To go back to the last page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Fetch the list of existing boards from the server
  useEffect(() => {
    fetch("http://localhost:8050/api/boards/")
      .then((response) => response.json())
      .then((data) => {
        setExistingBoards(data);
        setLoading(false);
      });
  }, []);

  // For changing the board name
  const handleBoardChange = (event) => {
    setBoardName(event.target.value);
  };

  // For updating the note data
  const handleNoteChange = (event) => {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  };

  //  Logic for adding a new note
  const handleAddNote = async () => {
    // Create a new note object
    const newNote = {
      ...noteData,
      board: boardName, 
    };

    console.log(newNote);

    // Send a POST request to the server to create a new note
    try {
      const response = await fetch("http://localhost:8050/api/notes/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the request was successful, clear the note data and board name
      setNoteData({ title: "", content: "" });
      setBoardName("");
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // Show a loading paragraph while servering is fetching data
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="create-note">
      <h2>Create a new note</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={noteData.title}
        onChange={handleNoteChange}
      />
      <textarea
        placeholder="Write down your ideas here..."
        name="content"
        value={noteData.content}
        onChange={handleNoteChange}
      />
      <select value={boardName} onChange={handleBoardChange}>
        <option value="">Select a board</option>
        {existingBoards.map((board) => (
          <option key={board._id} value={board.title}>
            {board.title}
          </option>
        ))}
      </select>
      <Link to="/create-board">Create New Board</Link>
      <button onClick={handleAddNote}>Add Note</button>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
}

export default CreateNote;
