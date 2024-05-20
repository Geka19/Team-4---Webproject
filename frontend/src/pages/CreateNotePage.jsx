import React from "react";
import CreateNote from "../components/CreateNote";
import styles from "../styles/CreateNotePage.module.css";

function CreateNotePage() {
  return (
    <div className="create-note-page">
      {" "}
      {/* Add class name here */}
      <CreateNote />
    </div>
  );
}

export default CreateNotePage;
