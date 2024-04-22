import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

// This page will be used to display notes for a specific board
function BoardNotes() {
  const { boardName } = useParams();
  const [notes, setNotes] = useState([]);

  // Using navigate to go back to the previous page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Fetch notes for the specific board that the user clicks on
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8050/api/notes/name/${boardName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log data to the console
        setNotes(data); // Set notes to data
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, [boardName]);

  // If there are no notes in the board display a message
  const message = notes.length === 0 ? <p>No notes found</p> : null;

  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <h1>{boardName}</h1>
        {message}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",    
          }}
        >
          {notes.map((note) => (
            <div
              key={note._id}
              style={{ border: "1px solid", padding: "10px", margin: "10px 0" }}
            >
              <h2>Title: {note.title}</h2>
              <p>Content: {note.content}</p>
              <p>Date: {note.date}</p>
              <p>Visibility: {note.visibility}</p>
              <p>Tags: {note.tags.join(", ")}</p>
            </div>
          ))}
        </div>
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={() => navigate(`/create-note`)}>Create Note</button>
      </div>
    </div>
  );
}

export default BoardNotes;
