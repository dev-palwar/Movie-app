import React, { useEffect, useState } from "react";
import fetchData from "../API/tmdbApi";
import Card from "../Components/Card";
import Loader from "../Components/Loader";

const Discover = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNum(pageNum + 1);
    }
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      if (pageNum === 1) {
        const fetchedData = await fetchData(
          { page: pageNum },
          "/discover/movie"
        );
        setData(fetchedData.results);
        setLoading(false);
      }
    };

    fetchAndSetData();
  }, [pageNum]);

  useEffect(() => {
    if (pageNum > 1) {
      const fetchMoreData = async () => {
        const fetchedData = await fetchData(
          { page: pageNum },
          "/discover/movie"
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
  }, [pageNum]);

  document.title = `Page ${pageNum} - Featured Movies`;

  return (
    <>
      <h1 style={{ fontSize: "4.2rem", marginBottom: "10px" }}>
        Featured movies
      </h1>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          data.map((value) => (
            <Card
              key={value.id}
              id={value.id}
              image={value.poster_path ?? value.profile_path}
              title={value.title ?? value.name}
              release_date={value.release_date ?? value.first_air_date}
              media_type="movie"
            />
          ))
        )}
      </div>
    </>
  );
};

export default Discover;
