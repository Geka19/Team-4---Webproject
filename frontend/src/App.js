import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Boards from "./pages/Board";
import BoardNotes from "./pages/BoardNotes";
import Profile from "./pages/Profile";
import CreateBoard from "./components/CreateBoard";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import EditBoard from "./components/EditBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/boards/name/:boardName" element={<BoardNotes />} />
      <Route path="/create-board" element={<CreateBoard />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/boards/name/:boardName/:noteId" element={<EditNote />} />
      <Route path="/boards/edit-board/:boardId" element={<EditBoard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
