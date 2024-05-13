import GetBoards from "../components/GetBoards";
import "../styles/Boards.css";

function Board() {
  return (
    <>
      <h1>Boards</h1>
      <p>Here are your boards:</p>
      <GetBoards />
    </>
  );
}

export default Board;
