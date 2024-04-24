import GetNotes from "../components/GetNotes";
import CreateNote from "../components/CreateNote";
import "../App.css";

function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the sustainability diary!</p>
      <CreateNote />
      <GetNotes />
    </>
  );
}

export default Home;
