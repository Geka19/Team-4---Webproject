import homeIcon from "../assets/img/home.png";
import boardIcon from "../assets/img/board.png";
import profileIcon from "../assets/img/profile.png";
import { Link } from "react-router-dom";
import "../App.css";

// For creating the sidebar
function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/">
          <img className="icon home" src={homeIcon} alt="icon for home page" />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/boards">
          <img className="icon board" src={boardIcon} alt="icon for home page" />
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/profile">
          <img className="icon profile" src={profileIcon} alt="icon for home page" />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
