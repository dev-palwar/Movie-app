import React, { useEffect, useState } from "react";
import fetchData from "../API/tmdbApi";
import Card from "./Card";
import Anya from "../Assets/Anya.png";

const Search = ({ title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (title) {
      const fetchAndSetData = async (value) => {
        const fetchedData = await fetchData({ query: title }, "/search/multi");
        setData(fetchedData.results);
      };
      fetchAndSetData("/search/multi");
    }
  }, [title]);

  return (
    <div className="container">
      {title ? (
        data.map((value) => (
          <Card
            key={value.id}
            id={value.id}
            image={value.poster_path ?? value.profile_path}
            title={value.title ?? value.name}
            release_date={value.release_date ?? value.first_air_date}
            media_type={value.media_type}
          />
        ))
      ) : (
        <div className="Anya">
          <img src={Anya} alt="" />
          <h2>You can search anything above...</h2>
        </div>
      )}
    </div>
  );
};

export default Search;
