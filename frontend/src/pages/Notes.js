import React, { useState } from "react";
import "../styles/Notes.css";
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="modal-button" onClick={() => handleOptionClick("existing board")}>
            Existing Board
          </button>
          <button className="modal-button" onClick={() => handleOptionClick("new board")}>
            New Board
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
