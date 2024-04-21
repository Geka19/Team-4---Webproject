import Sidebar from "../components/Sidebar";
import "../App.css";

function Profile() {
  return (
    <>
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <h1>Profile</h1>
          <p>Here is your profile:</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
