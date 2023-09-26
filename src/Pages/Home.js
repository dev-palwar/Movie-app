import React, { useState } from "react";
import Search from "../Components/Search";
import BsSearch from "react-icons/bs";
import { ImSearch } from "react-icons/im";

const Home = () => {
  const [search, setSearch] = useState();

  const handler = (e) => {
    setSearch(e.target.value);
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
          />
        </div>
        <Search title={search} />
      </div>
    </>
  );
};

export default Home;
