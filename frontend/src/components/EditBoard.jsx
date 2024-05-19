import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBoardContext } from "../context/BoardContext";
import { toast } from "react-toastify";
import GoBackButton from "./HandleGoBack";
import "react-toastify/dist/ReactToastify.css";
import "../styles/App.css";

const EditBoard = () => {
  const [board, setBoard] = useState({ title: "", description: "", tags: [] });
  const { boardId } = useParams();
  const { boards, setBoards, editBoard } = useBoardContext();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBoard((prevBoard) => ({
      ...prevBoard,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchedBoard = boards.find((board) => board._id === boardId);
    if (fetchedBoard) {
      setBoard(fetchedBoard);
    }
  }, [boardId, boards]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await editBoard(boardId, board);
      toast.success("Board Updated");
      navigate(-1);
    } catch (error) {
      toast.error(
        error.message || "An error occurred while updating the board"
      );
    }
  };

  return (
    <div className="note">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={board.title}
            onChange={handleChange}
            className="note-title"
            data-testid="title-input"
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={board.description}
            onChange={handleChange}
            className="note-content"
            data-testid="description-textarea"
          />
        </label>
        <button className="edit-board" type="submit">
          Update Board
        </button>
        <GoBackButton>Go Back</GoBackButton>
      </form>
    </div>
  );
};

export default EditBoard;
