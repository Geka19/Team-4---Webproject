import { Outlet } from "react-router-dom";
import "../styles/Layout.css";
import Sidebar from "../components/Sidebar";

/**
 * Layout component that wraps the main content and sidebar.
 * It serves as a structural component for pages, providing
 * consistent layout across the application.
 */
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
