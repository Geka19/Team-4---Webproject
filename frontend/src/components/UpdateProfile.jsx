import React, { useState } from "react";
import { toast } from "react-toastify";

function UpdateProfile({ currentUser, onUpdate }) {
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  const validateForm = () => {
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // If form is not valid return
    if (!validateForm()) return;

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return;
    }

    onUpdate({ username, email });
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <label className="profile-label">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="profile-input"
        />
      </label>
      <label className="profile-label">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-input"
        />
      </label>
      <button type="submit" className="profile-button">
        Update Profile
      </button>
    </form>
  );
}

export default UpdateProfile;
