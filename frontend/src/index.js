import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoardProvider } from "./context/BoardContext";
import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <NoteProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </NoteProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
