import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../Movie/MovieDetails.scss";
import fetchData from "../../Database/API/tmdbApi";
import { formatDate, formatDuration } from "../../utils/Functions";
import Videos from "../../Components/Player/Video";
import Loader from "../../Components/Loader/Loader";
import Caraousel from "../../Components/Caraousel/Caraousel";
import imdbLogo from "../../Assets/imdb logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWatchlist, setWatchlist } from "../../Database/Controllers/Database";

const Movie = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [movie, setMovies] = useState([]);
  const [recommendations, setRecommandations] = useState([]);
  const [cast, setCast] = useState([]);
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, makeAdded] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

  const dataToPost = {
    id: movie.id,
    name: movie.title,
    image: movie.poster_path,
    media_type: "movie",
  };

  if (user) {
    (async () => {
      makeAdded(await setWatchlist(movie.id));
    })();
  }

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const FetchDataAndSetData = async (
      endPointForMovie,
      endPointForMovieCast,
      endPointForRecommandations
    ) => {
      const movie = await fetchData("", endPointForMovie);
      const { cast } = await fetchData("", endPointForMovieCast);
      const fetchedRecommandations = await fetchData(
        "",
        endPointForRecommandations
      );
      const res = await fetchData(
        { external_source: "imdb_id" },
        `/find/${movie.imdb_id}`
      );

      if (isMounted) {
        setCast(cast);
        setMovies(movie);
        setRecommandations(fetchedRecommandations.results);
        if (res.movie_results.length > 0) {
          setRatings(res.movie_results[0].vote_average);
        }
        setLoading(false);

        document.title = `Movie ⋮⋮ ${movie.title}`;
      }
    };

    FetchDataAndSetData(
      `/movie/${params.id}`,
      `/movie/${params.id}/credits`,
      `/movie/${params.id}/recommendations`
    );
    return () => {
      isMounted = false; // Setting isMounted to false when the component unmounts
    };
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details-page">
          <ToastContainer theme="dark" />
          <div className="display-flex-row">
            <div className="title-info">
              <div>
                <span style={{ opacity: "0.5", marginRight: "20px" }}>
                  {formatDate(movie.release_date)} ⚪{" "}
                  {formatDuration(movie.runtime)}
                </span>
              </div>
              <h1 id="Movie-title">{movie.title}</h1>
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
                  {!added ? "Add to watchlist" : "Remove from watchlist"}
                </button>
              </div>
              <h3>
                <div className="genres">
                  {movie.genres.map((value) => {
                    return (
                      <span
                        key={value.id}
                        style={{ marginRight: "10px", color: "aquamarine" }}
                      >
                        {value.name}
                      </span>
                    );
                  })}
                </div>
              </h3>
              <div className="desc">
                <h3>Plot:</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
            <div className="title-image">
              <a href={movie.homepage} target="_blank">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
              </a>
            </div>
          </div>
          <Videos name="Videos" id={params.id} media_type={"movie"} />
          <div style={{ marginBottom: "90px" }}>
            {cast.length > 0 && (
              <Caraousel name="Cast" data={cast} media_type={"person"} />
            )}
          </div>
          {recommendations.length > 0 && (
            <Caraousel
              name="Recommendations"
              data={recommendations}
              media_type={"movie"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Movie;
