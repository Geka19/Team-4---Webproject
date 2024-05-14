import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";


// Initialize the Authentication Context
const AuthContext = createContext();

// Export a custom hook to use the authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// Export the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // For updating the user (When the user changes username or email)
  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };

  // Function to handle user login
  const login = async ({ email, password }) => {
    try {
      // Wait for response from the server
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      //  If the login is successful, set the current user
      setCurrentUser(response.data);
    } catch (error) {
      const errorMessage = "Login failed. Please try again.";
      console.error("Login Error:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Handle user logout
  const logout = async () => {
    try {
      // Wait for the server to respond to the logout request
      await axios.post("/api/auth/logout");
      // Clear the current user on logout
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw new Error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        // Make sure axios is configured to send the JWT token with the request
        const response = await axios.get("/api/auth/verify");
        // Assuming the response data contains user information
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Session verification failed:", error);
        setCurrentUser(null);
      }
    };

    verifySession();
  }, []);

  // Values to be provided through the context
  const value = {
    login,
    logout,
    updateUser,
    currentUser,
    isAuthenticated: !!currentUser, // boolean value to check if the user is authenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
