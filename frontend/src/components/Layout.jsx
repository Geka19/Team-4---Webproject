import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/Layout.css";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
      <Navbar />
      <div className="main-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
