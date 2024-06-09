// import "./App.css";
// import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/" element={<Login />} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
