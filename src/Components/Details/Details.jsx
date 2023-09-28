import React, { useEffect, useState } from "react";
import "../Details/details.scss";
import { formatDate, formatDuration } from "../../utils/Functions";
import imdbLogo from "../../Assets/imdb logo.png";
import {
  addToWatchlist,
  setWatchlist,
} from "../../Database/Controllers/Database";
import { useNavigate } from "react-router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Details = ({ data, ratings }) => {
  const navigate = useNavigate();
  const [isMovie, setIsMovie] = useState(false);
  const [added, makeAdded] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    (async () => { 
      makeAdded(await setWatchlist(data.id));
    })();
  }

  const dataToPost = {
    id: data.id,
    name: data.name,
    image: `https://image.tmdb.org/t/p/w500${
      data.profile_path ?? data.poster_path
    }`,
    media_type: "show",
  };

  useEffect(() => {
    if (data.number_of_seasons) {
      setIsMovie(false);
    } else {
      setIsMovie(true);
    }
  }, []);
console.log(ratings)
  return (
    <>
      <div className="details">
        <div className="title-info">
          {!isMovie ? (
            <div id="tv-status">
              <>
                <span style={{ opacity: "0.6" }}>
                  {data.first_air_date && formatDate(data.first_air_date)}
                </span>
                <span>
                  {data.number_of_seasons}{" "}
                  {data.number_of_seasons > 1 ? "Seasons" : "Season"}
                </span>
                <span>{data.in_production ? "ONGOING" : "AIRED"}</span>
              </>
            </div>
          ) : (
            <div className="movie-status">
              <span style={{ opacity: "0.5", marginRight: "20px" }}>
                {formatDate(data.release_date)} ⚪{" "}
                {formatDuration(data.runtime)}
              </span>
            </div>
          )}
          <h1>{isMovie ? data.title : data.name}</h1>
          <div className="button-group">
            <div className="imdb-box">
              <img src={imdbLogo} alt="IMDB" />
              <h2>{ratings}/10</h2>
            </div>
            <button
              style={{ background: added ? "purple" : "" }}
              className="wishlist-button"
              onClick={
                user
                  ? async () => makeAdded(await addToWatchlist(dataToPost))
                  : () => navigate("/login")
              }
            >
              <div>{!added ? <AiOutlineHeart /> : <AiFillHeart />}</div>
              {!added ? "Add to watchlist" : "Remove from watchlist"}
            </button>
          </div>
          <h3>
            {data.genres.map((value) => {
              return (
                <span
                  key={value.id}
                  style={{ marginRight: "10px", color: "aquamarine" }}
                >
                  {value.name}
                </span>
              );
            })}
          </h3>
          <div className="desc">
            <h3>Plot:</h3>
            <p>{data.overview}</p>
          </div>
        </div>
        <div className="title-image">
          <a href={data.homepage}>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Details;
