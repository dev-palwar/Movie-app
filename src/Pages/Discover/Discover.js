import React, { useEffect, useState } from "react";
import "../Discover/Discover.scss"
import fetchData from "../../Database/API/tmdbApi";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";

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
        const { results } = await fetchData(
          { page: pageNum },
          "/discover/movie"
        );
        setData(results);
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
      <h1>
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
