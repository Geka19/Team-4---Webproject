import React, { createContext, useContext, useState} from "react";
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

  // Function to handle user login
  const login = async ({ email, password }) => {
    try { 
      // Wait for response from the server
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
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

  // Values to be provided through the context
  const value = {
    login,
    logout,
    currentUser,
    isAuthenticated: !!currentUser, // Bollean value to check if the user is authenticated
  };

  return (
    <AuthContext.Provider value={value}>
       {children}
    </AuthContext.Provider>
  );
};
