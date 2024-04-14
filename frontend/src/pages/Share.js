import React from "react";
import "../styles/Share.css";
import img from "../assets/img/user.png";

const Share = () => {
  // We need to create the api so sharedNotes, otherPeopleNotes, and comments are populated
  // Will add later

  return (
    <div>
      <h1>Feed</h1>
      <h2>Recently Shared</h2>
      {/* This is where the shared notes will be displayed */}
      {/* We also need a function that allows user to leave comments on notes */}
      <div className="card">
        <img src={img} alt="user icon" className="icon" />
        <div className="content">
          <h2 className="username">John32</h2>
          <p className="text">Sustainability Diary</p>
          <p className="text">
            Today i learned something new about sustainability
          </p>
        </div>
      </div>
    </div>
  );
};

export default Share;
