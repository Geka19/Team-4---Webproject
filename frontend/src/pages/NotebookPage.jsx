import React from "react";
import Toolbar from "../components/Toolbar";
// import SaveTheNote from "../components/SaveTheNote";
import Textarea from "../components/Textarea";
import SaveNote from "../components/SaveNote";
import Sidebar from "../components/Sidebar";

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

function NotebookPage() {
  return (
    <div className="container">
      <Sidebar />

      <div className="main" id="main">
        <div className="note">
          <div className="note-header">
            <h1>Write a Note</h1>
            <div className="date-section">
              <label htmlFor="noteDate">Date: </label>
              <input type="date" id="noteDate" name="noteDate" />
            </div>
            <div className="menu-icon">
              <button onClick={toggleMenu}>Save?</button>
            </div>
          </div>
          <Toolbar />
          <Textarea />
          <SaveNote />
          <p id="errorText" className="error-text">
            Cannot save empty note
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotebookPage;
