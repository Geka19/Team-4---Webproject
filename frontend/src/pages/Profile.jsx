import React from "react";
import { useAuth } from "../context/AuthContext"; 
import "../styles/Profile.css";

function ProfilePage() {
  const { currentUser } = useAuth();
    
  return (
    <div>
      <h1>Welcome, {currentUser.username.charAt(0).toUpperCase() +
            currentUser.username.slice(1)}!</h1>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <p>Role: {currentUser.role}</p>
    </div>
  );
}

export default ProfilePage;