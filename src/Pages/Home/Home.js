import React, { useState } from "react";
import "../Home/home.scss";
import Search from "../../Components/Search";
import { ImSearch } from "react-icons/im";
import { useDebounce } from "../../hooks/debounce";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState();
  const debouncedQuery = useDebounce(searchQuery, 2000);

  function focusOnSearch(e) {
    if (e.key === "/" && e.target.tagName !== "INPUT") {
      document.getElementById("search").focus();
      e.preventDefault();
    }
  }

  window.addEventListener("keydown", focusOnSearch);

  const handler = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    localStorage.setItem("search", debouncedQuery);
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
            value={searchQuery}
          />
        </div>
        <Search title={debouncedQuery} />
      </div>
    </>
  );
};

export default Home;
