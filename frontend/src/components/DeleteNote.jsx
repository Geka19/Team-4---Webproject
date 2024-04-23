import React from "react";
import axios from "../api/axios";
import { useNoteContext } from "../context/NoteContext";

function DeleteNoteButton({ noteId }) {
  const { notes, setNotes } = useNoteContext();

  const deleteNote = async () => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      console.log("Note deleted successfully");
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNote();
    }
  };

  return <button onClick={handleDelete}>Delete Note</button>;
}

export default DeleteNoteButton;
