import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/GetNotes.css";

function GetNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8050/api/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes", error);
      });
  }, []);

  return (
    <div className="recent-notes-container">
      {notes.map((note) => (
        <div className="recent-notes-item" key={note._id}>
          <div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetNotes;
