import React, { useEffect, useRef } from "react";
import "../styles/PopupNote.css";
import "../styles/Button.css";

function PopupNote({ onClose }) {
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-wrapper">
      <div ref={popupRef} className="popup-note">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Popup Title</h2>
        <p>Popup content goes here...</p>
      </div>
    </div>
  );
}

export default PopupNote;
