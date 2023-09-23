import React, { useEffect, useState } from "react";
import avtar from "../Assets/avatar.png";
import "../Styles/Card.scss";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/Functions";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToWatchlist, setWatchlist } from "../utils/Controllers";

const Card = ({ id, image, title, release_date, media_type, character }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [added, makeAdded] = useState(false);

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
    };

    fetchData();
  }, [id, user]);

  return (
    <div className="card" style={{ height: media_type == "person" && "30vh" }}>
      <div className="card-image">
        <img src={image ? `https://image.tmdb.org/t/p/w500${image}` : avtar} />
        <div className="overlay">
          {user && <div className="heart-icon">
            {!added ? (
              <AiOutlineHeart className="icon" onClick={handleHeartClick} />
            ) : (
              <AiFillHeart className="icon" onClick={handleHeartClick} />
            )}
          </div>}
          <Link
            to={
              media_type === "movie"
                ? `/details_movie/${id}`
                : media_type === "tv"
                ? `/details_tv/${id}`
                : media_type === "person"
                ? `/details_cast/${id}`
                : `/details_tv/${id}`
            }
          >
            <div className="details">
              <h3>{title}</h3>
              <p>{release_date && formatDate(release_date)}</p>
              <p>{media_type == "person" ? character : media_type}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
