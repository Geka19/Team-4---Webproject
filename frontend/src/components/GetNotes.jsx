import React, { useState, useEffect } from "react";

function GetNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8050/api/notes/")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  }, []);

  const noteItems = notes.map((note) => {
    return (
      <li key={note._id} className="note">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </li>
    );
  });

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
