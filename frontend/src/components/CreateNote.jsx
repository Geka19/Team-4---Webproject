import React, { useState, useEffect } from "react";

function CreateNote() {
    const [boardName, setBoardName] = useState("");
    const [existingBoards, setExistingBoards] = useState([]);

    // Fetch the list of existing boards from the server
    useEffect(() => {
        // Your code to fetch the existing boards goes here
        // Example: fetchExistingBoards().then(data => setExistingBoards(data));
    }, []);

    const handleBoardChange = (event) => {
        setBoardName(event.target.value);
    };

    const handleCreateBoard = () => {
        // Your code to handle creating a new board goes here
        // Example: createNewBoard(boardName);
    };

    const handleAddNote = () => {
        // Your code to handle adding the note to the selected board goes here
        // Example: addNoteToBoard(boardName);
    };

    return (
        <>
            <div className="create-note">
                <h1>New Note</h1>
                <input type="text" placeholder="Title..." />
                <textarea placeholder="Write down your ideas here..." />
                <select value={boardName} onChange={handleBoardChange}>
                    <option value="">Select a board</option>
                    {existingBoards.map((board) => (
                        <option key={board.id} value={board.name}>
                            {board.name}
                        </option>
                    ))}
                </select>
                {boardName === "" ? (
                    <input
                        type="text"
                        placeholder="Enter board name..."
                        value={boardName}
                        onChange={(event) => setBoardName(event.target.value)}
                    />
                ) : null}
                <button onClick={boardName === "" ? handleCreateBoard : handleAddNote}>
                    {boardName === "" ? "Create Board" : "Add Note"}
                </button>
            </div>
        </>
    );
}

export default CreateNote;
