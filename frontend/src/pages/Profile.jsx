// ProfilePage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import UpdateProfile from "../components/UpdateProfile";
import { toast } from "react-toastify";
import "../styles/Profile.css";

function ProfilePage() {
  const { currentUser, updateUser } = useAuth();

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
        role
      }),
      
    });

    if (response.status === 200) {
      toast.success("User updated successfully");
      updateUser({ ...currentUser, username, email });
    } else {
      toast.error("Failed to update user");
    }
  };

  return (
    <div>
      <h1>
        Welcome,{" "}
        {currentUser.username.charAt(0).toUpperCase() +
          currentUser.username.slice(1)}
        !
      </h1>
      <UpdateProfile currentUser={currentUser} onUpdate={handleUpdate} />
    </div>
  );
}

export default ProfilePage;
