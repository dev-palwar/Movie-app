import React, { useState } from "react";
import Search from "../Components/Search";
import Modal from "../Components/Modal";

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
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            name="search"
            id="search"
            style={{ fontSize: "20px", padding: "0 0 0 20px" }}
            onChange={handler}
          />
        </div>
        <Modal />
        <Search title={search} />
      </div>
    </>
  );
};

export default Home;
