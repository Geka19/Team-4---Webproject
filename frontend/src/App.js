import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Opening from "./pages/Opening";
import Board from "./pages/Board";
import Notes from "./pages/Notes";
import Share from "./pages/Share";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      {/* Here you can add more routes for example if you create another page */}
      <Route path="/" element={<Layout />}>
        {/* Opening route (to quickly write down a note)*/}
        <Route index="/" element={<Opening />} />

        {/* Home/welcome route */}
        <Route path="home" element={<Home />} />

        {/* Board route */}
        <Route path="board" element={<Board />} />

        {/* Notes route */}
        <Route path="notes" element={<Notes />} />

        {/* Share route */}
        <Route path="share" element={<Share />} />

        {/* Settings route */}
        <Route path="settings" element={<Settings />} />

      </Route>

      {/* Fallback route for paths that does not exist*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
