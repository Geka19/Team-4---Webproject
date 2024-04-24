import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
