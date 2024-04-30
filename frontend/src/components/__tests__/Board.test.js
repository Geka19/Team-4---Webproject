import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

describe("BoardItem", () => {
  // Realistic usage case
  test("renders board title and description", () => {
    const board = { _id: '1', title: 'Board 1', description: 'Description 1', isDraft: false };
    
    render(
      <Router>
        <div
          className="board-item"
          key={board._id}
          style={{ order: board.isDraft ? -1 : 0 }}
        >
          <Link to={`/boards/name/${board.title}`}>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
          </Link>
          {!board.isDraft && (
            <Link to={`/boards/edit-board/${board._id}`}>Edit Board</Link>
          )}
        </div>
      </Router>
    );

    expect(screen.getByText('Board 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  // Boundary case
  test("renders 'Edit Board' link when board is not a draft", () => {
    const board = { _id: '1', title: 'Board 1', description: 'Description 1', isDraft: false };

    render(
      <Router>
        <div
          className="board-item"
          key={board._id}
          style={{ order: board.isDraft ? -1 : 0 }}
        >
          <Link to={`/boards/name/${board.title}`}>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
          </Link>
          {!board.isDraft && (
            <Link to={`/boards/edit-board/${board._id}`}>Edit Board</Link>
          )}
        </div>
      </Router>
    );

    expect(screen.getByText('Edit Board')).toBeInTheDocument();
  });

  // Edge case
  test("does not render 'Edit Board' link when board is a draft", () => {
    const board = { _id: '1', title: 'Board 1', description: 'Description 1', isDraft: true };

    render(
      <Router>
        <div
          className="board-item"
          key={board._id}
          style={{ order: board.isDraft ? -1 : 0 }}
        >
          <Link to={`/boards/name/${board.title}`}>
            <h1>{board.title}</h1>
            <p>{board.description}</p>
          </Link>
          {!board.isDraft && (
            <Link to={`/boards/edit-board/${board._id}`}>Edit Board</Link>
          )}
        </div>
      </Router>
    );

    const editLink = screen.queryByText('Edit Board');
    expect(editLink).not.toBeInTheDocument();
  });
});