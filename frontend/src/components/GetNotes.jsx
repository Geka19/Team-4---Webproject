import { useNoteContext } from "../context/NoteContext";

// For fetching the list of notes
function GetNotes() {
  const { notes } = useNoteContext();

  // Display a list of notes
  const noteItems = notes.map((note) => {
    return (
      <li key={note._id} className="note">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>{note.tags}</p>
        <p>{note.visibility}</p>
        <p>{note.date}</p>
      </li>
    );
  });

  // If there are no notes display a message to the user
  const message = notes.length === 0 ? <p>No notes found</p> : null;

  return (
    <>
      <h1>Recent Notes</h1>
      {message}
      <ul className="notes-group">{noteItems}</ul>
    </>
  );
}

export default GetNotes;
