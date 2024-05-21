import GetBoards from "../components/GetBoards";

function Board() {
  return (
    <>
      <h1 className="board-text">Boards</h1>
      <p className="board-text">Here are your boards:</p>
      <GetBoards />
    </>
  );
}

export default Board;
