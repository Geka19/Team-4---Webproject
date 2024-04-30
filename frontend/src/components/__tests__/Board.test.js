import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { BoardProvider } from '../../context/BoardContext';
import EditBoard from "../EditBoard";

const MockEditBoard = () => {
  // Mock the context value
  const contextValue = {
    boards: [],
    setBoards: jest.fn(),
  };

  return (
    <Router>
      <BoardProvider value={contextValue}>
        <EditBoard />
      </BoardProvider>
    </Router>
  );
};

describe("EditBoard", () => {
  test("renders EditBoard component", () => {
    render(<MockEditBoard />);
  });
});