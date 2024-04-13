import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Board from "./pages/Board";

function App() {
  return (
    <Routes>
      {/* Here you can add more routes for example if you create another page */}
      <Route path="/" element={<Layout />}>
        {/* Home/welcome route */}
        <Route path="home" element={<Home />} />

        {/* Notes route */}
        <Route index element={<Notes />} />

        {/* Board route */}
        <Route index element={<Board />} />
      </Route>

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
