import React, { useState } from "react";
import "../styles/Notes.css";

function Notes() {
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSaveNote = () => {
    // Save note logic here
  };

  const handleDraft = () => {
    // Save to drafts logic here
  };

  const handleBoard = () => {
    // Save to board logic here
  };

  const handleShare = () => {
    // Add note logic here
  };

  return (
    <div className="notes-container">
      <h1>New Note</h1>
      <textarea
        className="notes-textarea"
        value={note}
        onChange={handleNoteChange}
        placeholder="Write your ideas here..."
      />
      <h2>Upload an image</h2>
      <div className="notes-image">
        <input type="file" onChange={handleImageChange} />
        {image && <img src={image} alt="Note" />}
      </div>
      <div className="notes-button-container">
        <button className="notes-button" onClick={handleSaveNote}>
          Save Note
        </button>
        <button className="notes-button" onClick={handleDraft}>
          To Drafts
        </button>
        <button className="notes-button" onClick={handleBoard}>
          To Board
        </button>
        <button className="notes-button" onClick={handleShare}>
          Share
        </button>
      </div>
    </div>
  );
}

export default Notes;
