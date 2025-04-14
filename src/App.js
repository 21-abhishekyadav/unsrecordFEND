
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // eslint-disable-next-line
  Link
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Home from './components/Home';
import NoteState from './context/NoteState';
import PostState from './context/PostState';

import Login from './components/Login';
import Signup from './components/Signup';
import Posts from './components/Posts';
import About from './components/About';
import Footer from './components/Footer';





function App() {
  return (
    <div>
      <PostState>
        <NoteState>
          <Router>
            <Navbar />
            <div style={{ display: 'flex', }}>
              <div >
                <Sidebar />
              </div>
              <div >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/about" element={<About />} />


                </Routes>
              </div>
            </div>
            <Footer/>

          </Router>
        </NoteState>
      </PostState>

    </div>
  );
}

export default App;
