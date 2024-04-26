import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import "../styles/AuthForms.css";

// For the register page
function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "User", // Default role is "User" we dont have a way to create admins yet and there are no admin routes
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Update the state based on input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Validate the form before submitting
  const validateForm = () => {
    // Check if the all the required fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all the fields.");
      return false;
    }

    // The username must be at least 3 characters long
    if (formData.username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }

    // Check if the email is valid
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // The password must be at least 3 characters long
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  // For handling the register form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Send a POST request to the server to register the user
    // If the registration is successful, redirect the user to the login page
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/register", formData);
      toast.success(response.data.message || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="home-redirect-wrapper"></div>
      <div className="auth-content-wrapper">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>
              Username
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                autoComplete="current-username"
              />
            </label>
          </div>
          <div>
            <label>
              Email
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                autoComplete="current-email"
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </label>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p>
          Looking to sign in instead?{" "}
          <Link to="/login">Click here to login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
