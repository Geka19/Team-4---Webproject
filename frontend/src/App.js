import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import SecureRoute from "./components/AuthRoutes";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Boards from "./pages/Board";
import BoardNotes from "./pages/BoardNotes";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateBoard from "./components/CreateBoard";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import EditBoard from "./components/EditBoard";
import CreateNotePage from "./pages/CreateNotePage";

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route element={<SecureRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/createnotepage" element={<CreateNotePage />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/boards/id/:boardId" element={<BoardNotes />} />
            <Route path="/boards/create-board" element={<CreateBoard />} />
            <Route path="/create-note" element={<CreateNote />} />
            <Route path="/boards/id/:boardId/:noteId" element={<EditNote />} />
            <Route path="/boards/edit-board/:boardId" element={<EditBoard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* For pages not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer />
    </>
  );
}

export default App;
