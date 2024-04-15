import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/OpenNotes.css";

Modal.setAppElement("#root");

function OpenNotes({ onClose }) {
  const [note, setNote] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false); // State to manage error visibility

  const handleSave = () => {
    if (note.trim() === "") {
      setError(true); // Set error state if note is empty
      setModalIsOpen(false); // Don't open the modal if there's an error
    } else {
      setModalIsOpen(true);
      setError(false); // Clear error state if note is not empty
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  const handleOptionClick = (option) => {
    console.log(`Saving note to ${option}...`);
    setSelectedOption(option);
    handleCloseModal();
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
      <button onClick={handleSave} className="close-button">
        Save
      </button>
      {error && <p className="error-message">Cannot save empty note</p>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Select an option"
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
    </div>
  );
}

export default OpenNotes;
