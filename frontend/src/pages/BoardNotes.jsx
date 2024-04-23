import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";
import DeleteNoteButton from "../components/DeleteNote";
import Sidebar from "../components/Sidebar";
import "../App.css";

// This page will be used to display notes for a specific board
function BoardNotes() {
  const { boardName } = useParams();
  const { notes } = useNoteContext();

  // Using navigate to go back to the previous page
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/boards");
  };

  // Filtering notes based on the board name (using the URL parameter)
  const filteredNotes = notes.filter((note) => note.board === boardName);

  // If there are no notes in the board display a message
  const message = notes.length === 0 ? <p>No notes found</p> : null;

  return (
    <div className="app">
      <Sidebar />

      <div className="main-content">
        <h1>{boardName}</h1>
        {message}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              style={{ border: "1px solid", padding: "10px", margin: "10px 0" }}
            >
              <h2>Title: {note.title}</h2>
              <p>Content: {note.content}</p>
              <p>Date: {note.date}</p>
              <p>Visibility: {note.visibility}</p>
              <p>Tags: {note.tags.join(", ")}</p>
              <Link to={`/boards/name/${boardName}/${note._id}`}>Edit</Link>
              <DeleteNoteButton noteId={note._id}></DeleteNoteButton>
            </div>
          ))}
        </div>
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={() => navigate(`/create-note`)}>Create Note</button>
      </div>
    </div>
  );
}

export default BoardNotes;
