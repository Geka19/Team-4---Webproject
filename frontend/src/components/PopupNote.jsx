import React from "react";
import CreateNote from "./CreateNote";
import "../styles/PopupNote.css";

const PopupNote = ({ showPopup, togglePopup }) => {
  return (
    showPopup && (
      <div className="backdrop" onClick={togglePopup}>
        <div className="popup">
          {/* Close button */}
          <button className="close-button" onClick={togglePopup}>
            X
          </button>
          {/* CreateNote component */}
          <CreateNote />
        </div>
      </div>
    )
  );
};

export default PopupNote;
