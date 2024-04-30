import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";

const BoardContext = createContext();

// For creating a new context with the board data
// Will be used to not call upon the API every time we need to fetch the board data
// Will only be updated when the state changes
export function useBoardContext() {
  return useContext(BoardContext);
}

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards();
  }, []);

  // For fetching the list of boards and saving it in the context API state
  async function fetchBoards() {
    try {
      const response = await axios.get("/api/boards");
      setBoards(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
    }
  }

  // Update the state when a new board is added to the database
  const addBoard = async (newBoard) => {
    try {
      const response = await axios.post("/api/boards/", newBoard, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        throw new Error("Failed to add board");
      }

      // Update local state with the newly created board
      setBoards((prevBoards) => [...prevBoards, response.data]);

      // Fetch boards again to update the list with the latest data
      fetchBoards();
    } catch (error) {
      console.error("Failed to add board:", error);
    }
  };

  return (
    <BoardContext.Provider value={{ boards, setBoards, loading, addBoard }}>
      {loading ? <Spinner /> : children}
    </BoardContext.Provider>
  );
}
