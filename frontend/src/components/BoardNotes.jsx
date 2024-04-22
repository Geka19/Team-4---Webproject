import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BoardNotes() {
  const { boardName } = useParams();
  const [notes, setNotes] = useState([]);

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

  return (
    <div>
      <h1>{boardName}</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.date}</p>
          <p>{note.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default BoardNotes;
