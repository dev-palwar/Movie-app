import React, { useEffect, useState } from "react";
import fetchData from "../API/tmdbApi";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import { useNavigate, useParams } from "react-router";

const Discover = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(2);
  const { page } = useParams();
  const navigate = useNavigate();

  const handler = () => {
    setPageNum(pageNum + 1);
    setLoading(true);
    navigate(`/discover/${pageNum}`);
  };

  useEffect(() => {
    const fetchAndSetData = async () => {
      const fetchedData = await fetchData({ page: page }, "/discover/movie");
      setData(fetchedData.results);
      setLoading(false);
    };

    fetchAndSetData();
  }, [page]);

  document.title = `Page ${page}`;
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
        <div className="load-more">
          <button onClick={handler}>Load more</button>
        </div>
      </div>
    </>
  );
};

export default Discover;
