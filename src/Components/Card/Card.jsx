import React, { useEffect, useState } from "react";
import "../Card/Card.scss";
import "../../Styles/Skeleton.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/Functions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToWatchlist, setWatchlist, } from "../../Database/Controllers/Database";
import Movie from "../../Assets/movie";

const Card = ({ id, image, title, release_date, media_type, character }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [added, makeAdded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isImageLoaded, setImageLoaded] = useState(false);

  const dataToPost = {
    id: id,
    name: title,
    image: image,
    media_type: media_type,
  };

  const handleHeartClick = async () => {
    const isAdded = await addToWatchlist(dataToPost);
    makeAdded(isAdded);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const isAdded = await setWatchlist(id);
        makeAdded(isAdded);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, user]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`card ${isLoading ? "loading-skeleton" : ""}`}>
      {isLoading ? (
        <div className="loading-skeleton"></div>
      ) : (
        <div className="card-image">
          {image ? (
            <img
              loading="lazy"
              src={`https://image.tmdb.org/t/p/w500${image}`}
              onLoad={handleImageLoad}
              className={isImageLoaded ? "lazy-loaded" : ""}
              alt={title}
            />
          ) : (
            <div className="notfound">
              <Movie />
            </div>
          )}
          <div className="overlay">
            {user && (
              <div className="heart-icon">
                <p>{media_type == "person" ? character : media_type}</p>
                {!added ? (
                  <AiOutlineHeart className="icon" onClick={handleHeartClick} />
                ) : (
                  <AiFillHeart className="icon" onClick={handleHeartClick} />
                )}
              </div>
            )}
            <Link
              to={
                media_type === "movie"
                  ? `/movie/${id}`
                  : media_type === "tv"
                  ? `/tv/${id}`
                  : media_type === "person"
                  ? `/cast/${id}`
                  : `/tv/${id}`
              }
            >
              <div className="details">
                <h3>{title}</h3>
                <p>{release_date && formatDate(release_date)}</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
