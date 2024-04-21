import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Boards from "./pages/Board";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/board" element={<Boards />} />;
        <Route path="/profile" element={<Profile />} />;
    </Routes>
  );
}

export default App;
