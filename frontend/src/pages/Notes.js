import React, { useState } from "react";
import "../styles/Notes.css";

function Notes() {
  const [note, setNote] = useState("");

  const handleSave = () => {
    // Save the note here.
    // I havent added any logic yet will soon add it.
  };

  return (
    <div class="container">
      <h1>Notes</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "100%", height: "80vh" }}
        placeholder="Write your ideas here..."
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Notes;
