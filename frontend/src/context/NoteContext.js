import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";

const NoteContext = createContext();

export function useNoteContext() {
  return useContext(NoteContext);
}

// For creating a new context with the note data
// Will be used to not call upon the API every time we need to fetch the note data
// Will only be updated when the state changes
export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

    // For fetching the list of notes and saving it in the context API state
  async function fetchNotes() {
    try {
      const response = await axios.get("/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  }

  // Update the state when a new note is added to the database
  function addNote(notes) {
    setNotes(prevNotes => [...prevNotes, notes]);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, loading, addNote }}>
      {loading ? <Spinner /> : children}
    </NoteContext.Provider>
  );
}
