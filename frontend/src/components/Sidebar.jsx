import homeIcon from "../assets/img/home.png";
import boardIcon from "../assets/img/board.png";
import profileIcon from "../assets/img/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

import "../styles/App.css";

// For creating the sidebar
function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      // Wait for the logout request to complete
      await logout();
      // Redirect to the login page after successful logout
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-user">
        <h2>
          Welcome{" "}
          {currentUser.username.charAt(0).toUpperCase() +
            currentUser.username.slice(1)}
          !
        </h2>
      </div>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/home">
            <img
              className="icon home"
              src={homeIcon}
              alt="icon for home page"
            />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/boards">
            <img
              id="link-to-boards"
              className="icon board"
              src={boardIcon}
              alt="icon for home page"
            />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/profile">
            <img
              className="icon profile"
              src={profileIcon}
              alt="icon for home page"
            />
          </Link>
        </li>
        <li className="logout-item">
          <button onClick={handleLogout} className="logout">
            <i className="fas fa-sign-out-alt"></i>
            <span className="nav-item">Log out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
