import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { useNoteContext } from "../context/NoteContext";
import "../styles/CreateNote.css";

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
      // Updating the note context API state
      await addNote(note);

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

      <label className="create-note-content-wrapper">
        Title:
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={note.title}
          onChange={handleNoteChange}
        />
      </label>

      <label className="create-note-content-wrapper">
        Content:
        <textarea
          placeholder="Write down your ideas here..."
          name="content"
          value={note.content}
          onChange={handleNoteChange}
        />
      </label>

      <label className="create-note-content-wrapper">
        Tags:
        <input
          type="text"
          placeholder="Write down tags separated by commas..."
          name="tags"
          value={note.tags.join(",")}
          onChange={handleChange}
          className="create-note-tags"
        />
      </label>

      <label className="create-note-content-wrapper">
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

      <div className="create-note-buttons">
        <button onClick={handleAddNote}>Add Note</button>
        <button onClick={handleGoBack}>Go back</button>
      </div>
    </div>
  );
}

export default CreateNote;
