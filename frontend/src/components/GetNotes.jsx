import React, { useState, useEffect } from "react";

// For fetching the list of notes
function GetNotes() {
  const [notes, setNotes] = useState([]);

  // Fetch the list of notes from the server
  useEffect(() => {
    fetch("http://localhost:8050/api/notes/")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  // Display a list of notes
  const noteItems = notes.map((note) => {
    return (
      <li key={note._id} className="note">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </li>
    );
  });

  // If there are no notes display a message to the user
  const message = notes.length === 0 ? <p>No notes found</p> : null;

  return (
    <>
      <h1>Recent Notes</h1>
      {message}
      <ul className="notes-group">{noteItems}</ul>
    </>
  );
}

export default GetNotes;
