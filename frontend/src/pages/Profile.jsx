import React from "react";
import { useAuth } from "../context/AuthContext";
import { navigate } from "react-router-dom"; // Import navigate function
import { Link, useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
import { toast } from "react-toastify";
import "../styles/Profile.css";

function ProfilePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const handleUpdate = async ({ username, email }) => {
    console.log(`Updating user: ${username}, ${email}`);

    const userId = currentUser.id;
    const role = "User";

    const response = await fetch(`http://localhost:8050/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        role,
      }),
    });

    if (response.status === 200) {
      toast.success("User updated successfully");
      updateUser({ ...currentUser, username, email });
    } else {
      toast.error("Failed to update user");
    }
  };

  const handleLogout = async () => {
    try {
      // Wait for the logout request to complete
      await logout();
      // Redirect to the login page after successful logout
      navigate("/login");
      toast.success("Successfully logged out.");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <UpdateProfile currentUser={currentUser} onUpdate={handleUpdate} />
      <button onClick={handleLogout} className="logout">
        <i className="fas fa-sign-out-alt"></i>
        <span className="nav-item">Log out</span>
      </button>
    </div>
  );
}

export default ProfilePage;
