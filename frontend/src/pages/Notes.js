import React, { useState } from "react";
import "../styles/Notes.css";
<<<<<<< HEAD

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
=======
import Modal from "react-modal";

Modal.setAppElement("#root");

function Notes() {
  const [note, setNote] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSave = () => {
    setModalIsOpen(true);
  };

  const handleOptionClick = (option) => {
    // need to have some logic so we can save the note to the selected option
    // like new board or existing board
    // for now, i'll just log the option to the console to test it
    console.log(`Saving note to ${option}...`);
    setModalIsOpen(false);
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "20px",
    },
  };

  return (
    <div className="container">
      <h1>Notes</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "100%", height: "80vh" }}
        placeholder="Write your ideas here..."
      />
      <button onClick={handleSave}>Save</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h2>Select an option</h2>
        <p>Save to:</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="modal-button"
            onClick={() => handleOptionClick("existing board")}
          >
            Existing Board
          </button>
          <button
            className="modal-button"
            onClick={() => handleOptionClick("new board")}
          >
            New Board
          </button>
        </div>
      </Modal>
>>>>>>> main
    </div>
  );
}

export default Notes;
