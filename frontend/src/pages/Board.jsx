import Sidebar from "../components/Sidebar";
import GetNotes from "../components/GetNotes";
import "../App.css";

function Home() {
  return (
    <>
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <h1>Boards</h1>
          <p>Here are your boards:</p>
          <GetNotes />
        </div>
      </div>
    </>
  );
}

export default Home;
