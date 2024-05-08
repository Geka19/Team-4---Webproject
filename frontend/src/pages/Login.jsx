import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthForms.css";
import Button from "../components/Button.jsx";
import "../styles/Button.css";

// The Login component is used to allow users to log in to the application.
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const [showPopup, setShowPopup] = useState(false); // Add state for the popup

  // To navigate the user to the home page after successful login
  const navigate = useNavigate();

  // Update the state based on input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  // Validating the input fields before sending a login request
  const validateInputs = () => {
    if (!email || !password) {
      toast.error("Please enter all the fields.");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // For handling the login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Stop the function if the input fields are invalid
    if (!validateInputs()) return;

    try {
      // Wait for the login request to complete
      await auth.login({ email, password });
      toast.success("Login successful.");
      // Redirect the user to the home page after successful login
      navigate("/home");
      // Set showPopup to true after successful login
      setShowPopup(true);
    } catch (error) {
      // Handles any login errors
      toast.error(
        "Login unsuccessful. Please verify that your email and password are correct."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                autoComplete="current-email"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </label>
          </div>

          <Button variant="login" onClick={handleSubmit}>
            Login
          </Button>
        </form>
        <p>
          New here? <Link to="/register">Sign up now</Link>.
        </p>
      </div>
    </div>
  );
}

export default Login;
