import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Notes from "./pages/Notes"; // Make sure to import the Notes component

function App() {
  return (
    <Routes>
      {/* Here you can add more routes for example if you create another page */}
      <Route path="/" element={<Layout />}>
        {/* Home/welcome route */}
        <Route index element={<Home />} />
        {/* Notes route */}
        <Route path="notes" element={<Notes />} />
      </Route>

      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;