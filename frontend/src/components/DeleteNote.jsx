import axios from "../api/axios";
import { useNoteContext } from "../context/NoteContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// For deleting a note
function DeleteNoteButton({ noteId }) {
  const { notes, setNotes } = useNoteContext();

  // Using the note ID to delete the note from the database
  const deleteNote = async () => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      // Display a success toast
      toast.success("Note Deleted"); 
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      // Display an error toast
      toast.error("Failed to delete note"); 
      console.error("Failed to delete note:", error);
    }
  };

  // Ask the user if they are sure they want to delete the note
  // The window confirm is not permanent and can be removed
  // Finished version will use better way to confirm deletion
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
