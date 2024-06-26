import React, { useEffect, useRef, useState } from "react";
import "../styles/PopupNote.css";
import "../styles/Button.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { useNoteContext } from "../context/NoteContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PopupNote({ onClose }) {
  const popupRef = useRef();
  const { boards } = useBoardContext();
  const { addNote } = useNoteContext();
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [],
    board: "",
  });
  const [selectedBoard, setSelectedBoard] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, [onClose]);

  const handleBoardChange = (event) => {
    setSelectedBoard(event.target.value);
    setNote({
      ...note,
      board: event.target.value,
    });
  };

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === "tags" ? value.split(",") : value,
    }));
  };

  const handleAddNote = async () => {
    try {
      if (!selectedBoard) {
        toast.error("Please select a board");
        return;
      }

      await addNote({
        ...note,
        board: selectedBoard,
      });
      toast.success("Note Added");

      setNote({
        title: "",
        content: "",
        tags: [],
        board: "",
      });
      // Navigate to the boards page after successfully adding the note
      navigate("/boards");
    } catch (error) {
      toast.error("Failed to add note");
      console.error("Failed to add note:", error);
    }
  };

  const handleXButtonClick = () => {
    // Check if any input fields have been modified
    if (isNoteChanged()) {
      const confirmClose = window.confirm(
        "Your note is not saved. Are you sure you want to close the note?"
      );
      if (confirmClose) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const isNoteChanged = () => {
    // Check if note has been changed
    // Return true if changed, false otherwise
    // You can implement this based on your application logic
    // For example, compare the current note with the initial state
    return (
      note.title !== "" ||
      note.content !== "" ||
      note.tags.length > 0 ||
      selectedBoard !== ""
    );
  };

  return (
    <div className="popup-wrapper">
      <div ref={popupRef} className="popup-note">
        <button className="close-btn" onClick={handleXButtonClick}>
          X
        </button>
        <h2>Create a new note</h2>
        <label className="create-note-content-wrapper">
          <input
            type="text"
            id="title"
            placeholder="Title"
            name="title"
            value={note.title}
            onChange={handleNoteChange}
          />
        </label>

        <label className="create-note-content-wrapper">
          <textarea
            id="content"
            placeholder="Write down your ideas here..."
            name="content"
            value={note.content}
            onChange={handleNoteChange}
          />
        </label>

        <div className="create-note-buttons">
          <div>
            <label className="create-note-content-wrapper">
              <input
                id="tags"
                type="text"
                placeholder="Write down tags separated by commas..."
                name="tags"
                value={note.tags.join(",")}
                onChange={handleChange}
                className="create-note-tags"
              />
            </label>

            <label className="create-note-content-wrapper">
              <select value={selectedBoard} onChange={handleBoardChange}>
                <option value="">Select a board</option>
                {boards.map((board) => (
                  <option key={board._id} value={board._id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </label>
            <Link id="create-new-board" to="/boards/create-board">
              Create New Board
            </Link>
          </div>

          <button onClick={handleAddNote}>Save Note</button>
        </div>
      </div>
    </div>
  );
}

export default PopupNote;
