import React from "react";
import { Link } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  return (
    <main className="home-container">
      <section className="welcome-wrapper">
        <h1>Welcome to the Sustainability Diary!</h1>
        <p>
          This application helps you track your sustainability goals and
          achievements. Write down your diary notes on the go!. Get started by
          creating an account or logging in.
        </p>
        <div className="buttons-welcome">
          <Link to="/login">
            <button className="test-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="test-register">Register</button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
