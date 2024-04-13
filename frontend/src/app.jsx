import React from "react";
import { Routes, Route } from "react-router-dom";
import Notebook from "./pages/NotebookPage";

// Still working on the protected routes and authentication/ admin login functionality

// App component
const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<WelcomePage />} />
      {/* <Route
        path="/dashboard"
        element={<AdminRoute element={<DashboardPage />} />}
      /> */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
