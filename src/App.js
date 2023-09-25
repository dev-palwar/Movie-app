import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetails from "./Pages/MovieDetails";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Discover from "./Pages/Discover";
import "./utils/Functions";
import TvDetail from "./Pages/TvDetail";
import CastDetails from "./Pages/CastDetails";
import "../src/Styles/Media.scss";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import { getUser } from "./utils/Controllers";
import Watchlist from "./Pages/Watchlist";

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
              <Route path="/details_movie/:id" element={<MovieDetails />} />
              <Route path="/details_tv/:id" element={<TvDetail />} />
              <Route path="/details_cast/:id" element={<CastDetails />} />
              <Route path="/discover/:page" element={<Discover />} />
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
