import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Sidebar from "../components/Sidebar";

// For the layout component
const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
