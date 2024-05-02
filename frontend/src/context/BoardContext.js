import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../api/axios";
import { Spinner } from "react-bootstrap";
import { useAuth } from "./AuthContext";

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
  const { currentUser } = useAuth();

  // For fetching the list of boards and saving it in the context API state
  const fetchBoards = useCallback(async () => {
    try {
      // Get the current user's ID
      const userId = currentUser.id;

      // Fetch both the user's boards and the draft board
      const [responseUserBoards, responseDraft] = await Promise.all([
        axios.get(`/api/boards/user/${userId}`),
        axios.get(`/api/boards/default/draft`),
      ]);

      // Combine the boards into a single array
      const boards = [...responseUserBoards.data, responseDraft.data];

      // Update the state with the fetched boards
      setBoards(boards);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch boards:", error);
      setLoading(false);
    }
  }, [currentUser]); // Dependecies of fetchboards

  useEffect(() => {
    // Check if currentUser is available before fetching boards
    if (currentUser && currentUser.id) {
      fetchBoards();
    } else {
      // If currentUser is not available, set loading to false
      setLoading(false);
    }
  }, [currentUser, fetchBoards]); // Trigger useEffect whenever currentUser or fetchBoards changes

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
