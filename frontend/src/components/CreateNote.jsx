import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { useNoteContext } from "../context/NoteContext";

// For creating a new note
function CreateNote() {
  const { boards } = useBoardContext();
  const { addNote } = useNoteContext();
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    board: "",
  });

  // For navigating to the last page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBoardChange = (event) => {
    setNote({
      ...note,
      board: event.target.value,
    });
  };

  // For changing the note data
  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // For changing the note data when the user types in the tags input field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  // Uploading json data to the server when creating a new note
  const handleAddNote = async () => {
    try {
      const response = await fetch("http://localhost:8050/api/notes/upload/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      // Updating the note context API state
      await addNote(note);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clearing the note data after the user submits the form
      setNote({
        title: "",
        content: "",
        tags: [],
        board: "",
      });
    } catch (error) {
      console.error("Failed to add note:", error);
    }

    // Redirect the user back to the previous page they were on
    navigate(-1);
  };

  return (
    <div className="create-note">
      <h2>Create a new note</h2>
      <label>
        Title:
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={note.title}
          onChange={handleNoteChange}
        />
      </label>

      <label>
        Content:
        <textarea
          placeholder="Write down your ideas here..."
          name="content"
          value={note.content}
          onChange={handleNoteChange}
        />
      </label>

      <label>
        Tags:
        <input
          type="text"
          placeholder="Write down tags separated by commas..."
          name="tags"
          value={note.tags.join(",")}
          onChange={handleChange}
          className="note-tags"
        />
      </label>

      <label>
        Board:
        <select value={note.board} onChange={handleBoardChange}>
          <option value="">Select a board</option>
          {boards.map((board) => (
            <option key={board._id} value={board.title}>
              {board.title}
            </option>
          ))}
        </select>
      </label>

      <Link to="/create-board">Create New Board</Link>
      <button onClick={handleAddNote}>Add Note</button>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
}

export default CreateNote;
