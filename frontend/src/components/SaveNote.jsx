import React from "react";

function SaveNote() {
  return (
    <form id="boardsForm">
      <label htmlFor="boards">Add to a board:</label>
      <select id="boards" className="boards">
        <option value="" disabled hidden>
          Select a board
        </option>
        <option value="board1">Board example 1</option>
        <option value="board2">Board example 2</option>
        <option value="board3" className="CreateANewBoard">
          Create a new board
        </option>
      </select>
      <label htmlFor="hashtags"># Add hashtags:</label>
      <input type="text" />
      <label htmlFor="addToFavorites">Public</label>
      <input type="checkbox" id="addToFavorites" className="addToFavorites" />
      <div classclassName="custom-select"></div>
    </form>
  );
}

export default SaveNote;
