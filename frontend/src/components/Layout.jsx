import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "../styles/Layout.css";
import Navbar from "./Navbar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-content">
        <Header />
        <Outlet />
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Layout;
