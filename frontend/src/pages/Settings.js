import React from "react";
import "../styles/Settings.css";

// Settings page
// We need to find the user data from the database and add it here and show the user
// their username, email, and password
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "JohnDoe",
      email: "john.doe@example.com",
      password: "********",
    };
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <h1>Settings</h1>
        <div className="settings">
          <form>
            <label>
              Username:
              <input type="text" name="username" value={username} readOnly />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={email} readOnly />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                readOnly
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
