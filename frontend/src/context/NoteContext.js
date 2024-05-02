import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();

export function useNoteContext() {
  return useContext(NoteContext);
}

// For creating a new context with the note data
export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // For fetching the list of notes and saving it in the context API state
  const fetchNotes = useCallback(async () => {
    try {
      const userId = currentUser.id;
  
      const response = await axios.get(`/api/notes/user/${userId}`);
      const userNotes = response.data;

      setNotes(userNotes);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setLoading(false); // Ensure loading state is updated even in case of error
    }
  }, [currentUser]); 

  useEffect(() => {
    // Check if currentUser is available before fetching notes
    if (currentUser && currentUser.id) {
      fetchNotes();
    } else {
      // If currentUser is not available, set loading to false
      setLoading(false);
    }
  }, [currentUser, fetchNotes]); 
  
  async function addNote(newNote) {
    try {
      // Add the new note to the backend
      const response = await axios.post("/api/notes/upload", newNote, {
        headers: {
          "Content-Type": "application/json",
        },
        useCredentials: true,
      });

      if (response.status !== 201) {
        throw new Error("Failed to add note");
      }

      // Fetch the latest notes from the backend
      await fetchNotes();
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, loading, addNote }}>
      {loading ? <Spinner /> : children}
    </NoteContext.Provider>
  );
}
