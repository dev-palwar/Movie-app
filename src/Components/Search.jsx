import React, { useEffect, useState } from "react";
import fetchData from "../Database/API/tmdbApi";
import Card from "./Card/Card";
import Anya from "../Assets/Anya.png";

const Search = ({ title }) => {
  const [pageNum, setPageNum] = useState(1);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNum(pageNum + 1);
      localStorage.setItem("page_num", pageNum);
    }
  };

  useEffect(() => {
    if (title) {
      const fetchAndSetData = async (value) => {
        const fetchedData = await fetchData({ query: title }, "/search/multi");
        setData(fetchedData.results);
        setLoading(false);
      };
      fetchAndSetData("/search/multi");
    }
  }, [title]);

  useEffect(() => {
    if (pageNum > 1) {
      const fetchMoreData = async () => {
        const fetchedData = await fetchData(
          {
            query: localStorage.getItem("search"),
            page: localStorage.getItem("page_num"),
          },
          "/search/multi"
        );
        setData((prev) => [...prev, ...fetchedData.results]);
        setLoading(false);
      };

      fetchMoreData();
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [pageNum, localStorage.getItem("page_num")]);

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
            loading={loading}
          />
        ))
      ) : (
        <div className="Anya">
          <img src={Anya} alt="" />
          <h2>Press '/' to search</h2>
          <p
            style={{
              position: "absolute",
              bottom: 0,
              marginBottom: "1rem",
              textAlign: "center",
              lineHeight: "1rem",
              fontSize: "12px"
            }}
          >
            You may need to connect through a VPN depending on your location, as
            the API may be restricted or unavailable in certain countries.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
