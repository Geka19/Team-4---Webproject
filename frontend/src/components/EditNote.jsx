import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";
import { useBoardContext } from "../context/BoardContext";
import { toast } from "react-toastify";
import GoBackButton from "./HandleGoBack";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

// For editing a note
const EditNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    board: "",
  });
  const { noteId } = useParams();
  const { setNotes } = useNoteContext();
  const { boards } = useBoardContext();

  // Using navigate to go back to the previous page
  const navigate = useNavigate();

  // For changing the note data when the user types in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  // For changing the board data when the user selects a board
  const handleBoardChange = (event) => {
    const selectedBoardId = event.target.value;
    setNote((prevNote) => ({ ...prevNote, board: selectedBoardId }));
  };

  // This will get the current note from the database
  // So the user can see what has previously been written in the note
  useEffect(() => {
    fetch(`http://localhost:8050/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setNote({
          title: data.title,
          content: data.content,
          tags: data.tags,
          date: data.date,
          board: data.board,
        });
      });
  }, [noteId]);

  // For updating the note data
  // This function will be called when the user submits the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the updated note data to the server
    try {
      const response = await fetch(
        `http://localhost:8050/api/notes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...note, board: note.board }),
        }
      );

      // If the request fails, throw an error
      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      // If the request is successful, display a success message to the user 
      toast.success("Note Updated");
      navigate(-1);

      // Update the notes context API state
      setNotes((prevNotes) =>
        prevNotes.map((prevNote) =>
          prevNote._id === noteId ? { ...prevNote, ...note } : prevNote
        )
      );
    } catch (error) {
      // If the request fails, display an error message to the user
      toast.error(error.message || "An error occurred while updating the note");
    }
  };

  return (
    <div className="note">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="note-title"
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            className="note-title"
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
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
              <option key={board._id} value={board._id}>
                {board.title}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Update Note</button>
        <GoBackButton>Go Back</GoBackButton>
      </form>
    </div>
  );
};

export default EditNote;
