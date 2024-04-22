import Sidebar from "../components/Sidebar";
import GetBoards from "../components/GetBoards";
import "../App.css";

function Home() {
  return (
    <>
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <h1>Boards</h1>
          <p>Here are your boards:</p>
          <GetBoards />
        </div>
      </div>
    </>
  );
}

export default Home;
