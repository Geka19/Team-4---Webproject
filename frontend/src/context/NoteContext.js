import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";

const NoteContext = createContext();

export function useNoteContext() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await axios.get("/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  }

  function addNote(notes) {
    setNotes(prevNotes => [...prevNotes, notes]);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, loading, addNote }}>
      {loading ? <Spinner /> : children}
    </NoteContext.Provider>
  );
}
