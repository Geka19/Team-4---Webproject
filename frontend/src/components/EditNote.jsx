import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";
import "../styles/App.css";

// For editing a note
const EditNote = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const { noteId, boardName } = useParams();
  const { setNotes } = useNoteContext();

  // Using navigate to go back to the previous page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/boards/name/${boardName}`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  useEffect(() => {
    fetch(`http://localhost:8050/api/notes/${noteId}`)
      .then((response) => response.json())
      .then((data) => {
        setNote({
          title: data.title,
          content: data.content,
          tags: data.tags,
          date: data.date,
        });
      });
  }, [noteId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8050/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      console.error("Failed to update note");
      return;
    }

    // Update the notes context API state
    setNotes((prevNotes) =>
      prevNotes.map((prevNote) =>
        prevNote._id === noteId ? { ...prevNote, ...note } : prevNote
      )
    );

    console.log("Updated Note:", note);

    // navigate to previous page when note is updated
    navigate(`/boards/name/${boardName}`);
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
        <button type="submit">Update Note</button>
        <button onClick={handleGoBack}>Go Back</button>
      </form>
    </div>
  );
};

export default EditNote;
