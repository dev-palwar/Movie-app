import React, { useState } from "react";
import "../Home/home.scss";
import Search from "../../Components/Search";
import { ImSearch } from "react-icons/im";

const Home = () => {
  const [search, setSearch] = useState();

  function focusOnSearch(e) {
    if (e.key === "/" && e.target.tagName !== "INPUT") {
      document.getElementById("search").focus();
      e.preventDefault();
    }
  }

  window.addEventListener("keydown", focusOnSearch);

  const handler = (e) => {
    setSearch(e.target.value);
    localStorage.setItem("search", e.target.value);
  };
  document.title = "Home";

  return (
    <>
      <div className="homepage">
        <div className="search-box" style={{ display: "flex" }}>
          <div className="search-icon">
            <ImSearch />
          </div>
          <input
            placeholder="Search movies, tv or people..."
            type="search"
            name="search"
            id="search"
            onChange={handler}
            value={localStorage.getItem("search") || search}
          />
        </div>
        <Search title={search || localStorage.getItem("search")} />
      </div>
    </>
  );
};

export default Home;
