// App.js

import React, { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showMain, setShowMain] = useState(true);

  const saveNote = () => {
    // Implement save note functionality
  };

  const deleteNote = () => {
    // Implement delete note functionality
  };

  const saveToDraft = () => {
    // Implement save to draft functionality
  };

  const saveToFolder = () => {
    // Implement save to folder functionality
  };

  const showNotes = () => {
    setShowMain(false);
  };

  const showMainContent = () => {
    setShowMain(true);
  };

  const toggleMenu = () => {
    // Implement toggle menu functionality
  };

  return (
    <div className="container">
      <Sidebar showNotes={showNotes} showMain={showMainContent} />
      <div className="content">
        {showMain ? (
          <Main saveNote={saveNote} toggleMenu={toggleMenu} />
        ) : (
          <Notes notes={notes} />
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ showNotes, showMain }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">NoteApp</h2>
      <ul>
        <li>
          <a href="#" onClick={showMain}>
            Main
          </a>
        </li>
        <li>
          <a href="#" onClick={showNotes}>
            Notes
          </a>
        </li>
      </ul>
    </div>
  );
};

const Main = ({ saveNote, toggleMenu }) => {
  return (
    <div className="main">
      <h1>Notebook</h1>
      <div className="note">{/* Note Content */}</div>
    </div>
  );
};

const Notes = ({ notes }) => {
  return (
    <div className="notes">
      <h1>My Notes</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
