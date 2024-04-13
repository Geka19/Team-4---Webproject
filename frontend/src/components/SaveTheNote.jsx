import React from "react";

function SaveTheNote() {
  return (
    <div className="menu" id="menu">
      <span className="close-menu" onClick="toggleMenu()">
        &times;
      </span>
      <button onClick="saveNote()">Save Note</button>
      <button>Delete Note</button>
      <button>Save to Draft</button>
      <button>Save to Folder</button>
      <button>hjwkl</button>
    </div>
  );
}

export default SaveTheNote;
