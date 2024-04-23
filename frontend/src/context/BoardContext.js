import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { Spinner } from 'react-bootstrap'; 

const BoardContext = createContext();

export function useBoardContext() {
  return useContext(BoardContext);
}

export function BoardProvider({ children }) {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBoards() {
      try {
        const response = await axios.get("/api/boards");
        setBoards(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    }

    fetchBoards();
  }, []);

  if (loading) {
    return <Spinner animation="border" />
  }

  return (
    <BoardContext.Provider value={{ boards }}>{children}</BoardContext.Provider>
  );
}