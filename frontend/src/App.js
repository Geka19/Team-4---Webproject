import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Boards from "./pages/Board";
import BoardNotes from "./components/BoardNotes";
import Profile from "./pages/Profile";
import CreateBoard from "./components/CreateBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/boards/name/:boardName" element={<BoardNotes />} />
      <Route path="/create-board" element={<CreateBoard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
