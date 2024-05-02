import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";
import { useBoardContext } from "../context/BoardContext";
import DeleteNoteButton from "../components/DeleteNote";
import GoBackButton from "../components/HandleGoBack";
import "../styles/App.css";

// This page will be used to display notes for a specific board
function BoardNotes() {
  const { boardId } = useParams();
  const { notes } = useNoteContext();
  const { boards } = useBoardContext();
  const navigate = useNavigate();

  // Filter the notes based on the corresponding board id from the URL
  // This will display only the notes that belong to the board
  const filteredNotes = notes.filter((note) => note.board === boardId);

  // For get the board.title to use as h1
  const board = boards.find((board) => board._id === boardId);

  // If there are no notes in the board display a message
  const message = notes.length === 0 ? <p>No notes found</p> : null;

  return (
    <>
      <h1>{board.title}</h1>
      {message}
      <button onClick={() => navigate(`/create-note`)}>Create Note</button>
      <GoBackButton>Go Back</GoBackButton>
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
            <Link to={`/boards/id/${boardId}/${note._id}`}>Edit</Link>
            <DeleteNoteButton noteId={note._id}></DeleteNoteButton>
          </div>
        ))}
      </div>
    </>
  );
}

export default BoardNotes;
