import Sidebar from "../components/Sidebar";
import GetNotes from "../components/GetNotes";
import CreateNote from "../components/CreateNote";
import "../App.css";

function Home() {
  return (
    <>
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <h1>Home</h1>
          <p>Welcome to the sustainability diary!</p>
          <CreateNote />
          <GetNotes />
        </div>
      </div>
    </>
  );
}

export default Home;
