import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Pages/Movie/Movie";
import Home from "../src/Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Discover from "./Pages/Discover/Discover";
import "./utils/Functions";
import Login from "./Pages/Login/Login";
import { useEffect } from "react";
import { getUser } from "../src/Database/Controllers/Database";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Search from "./Components/Search";
import Tv from "./Pages/Tv/Tv";
import Cast from "./Pages/Cast/Cast";

function App() {
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {navigator.onLine ? (
        <div className="app-container">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search/:type" element={<Search />} />
              <Route path="/movie/:id" element={<Movie />} />
              <Route path="/tv/:id" element={<Tv />} />
              <Route path="/cast/:id" element={<Cast />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </Router>
        </div>
      ) : (
        <h2>You are Offline...</h2>
      )}
    </>
  );
}

export default App;
