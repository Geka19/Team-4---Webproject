import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();

export function useNoteContext() {
  return useContext(NoteContext);
}

// For creating a new context with the note data
// Will be used to call upon the API every time we need to fetch the note data
// Will only be updated when the state changes
export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    // Check if currentUser is available before fetching notes
    if (currentUser && currentUser.id) {
      fetchNotes();
    } else {
      // If currentUser is not available, set loading to false
      setLoading(false);
    }
  }, [currentUser]); // Trigger useEffect whenever currentUser changes

  // For fetching the list of notes and saving it in the context API state
  async function fetchNotes() {
    try {
      const response = await axios.get("/api/notes");
      const allNotes = response.data;

      // Filter notes if currentUser is available
      const userNotes = currentUser
        ? allNotes.filter((note) => note.user === currentUser.id)
        : [];

      setNotes(userNotes);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setLoading(false); // Ensure loading state is updated even in case of error
    }
  }

  async function addNote(newNote) {
    try {
      // Add the new note to your backend
      const response = await axios.post("/api/notes/upload", newNote, {
        headers: {
          "Content-Type": "application/json",
        },
        useCredentials: true,
      });

      if (response.status !== 201) {
        throw new Error("Failed to add note");
      }

      // Fetch the latest notes from your backend
      const latestNotes = await axios.get("/api/notes");
      setNotes(latestNotes.data);
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
