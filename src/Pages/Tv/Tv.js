import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import fetchData from "../../Database/API/tmdbApi";
import { formatDate } from "../../utils/Functions";
import "../Tv/TvDetails.scss";
import Caraousel from "../../Components/Caraousel/Caraousel";
import Videos from "../../Components/Player/Video";
import Loader from "../../Components/Loader/Loader";
import imdbLogo from "../../Assets/imdb logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWatchlist, setWatchlist } from "../../Database/Controllers/Database";

const Tv = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recommendations, setRecommandations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [cast, setCast] = useState({});
  const [ratings, setRating] = useState();
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
    image: data.poster_path,
    media_type: "show",
  };

  useEffect(() => {
    setLoading(true);

    const fetchAndSetData = async () => {
      const tvData = await fetchData("", `/tv/${params.id}`);
      const { cast } = await fetchData("", `/tv/${params.id}/credits`);
      const { imdb_id } = await fetchData("", `/tv/${params.id}/external_ids`);
      const fetchedRecommandations = await fetchData(
        { page: 1 },
        `/tv/${params.id}/recommendations`
      );
      const res = await fetchData(
        { external_source: "imdb_id" },
        `/find/${imdb_id}`
      );
      console.log(tvData);
      setData(tvData);
      setCast(cast);
      setRating(res.tv_results[0].vote_average);
      setRecommandations(fetchedRecommandations.results);

      setLoading(false);
      document.title = `Show ⋮⋮ ${tvData.name}`;
    };

    fetchAndSetData();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="details-page">
          <ToastContainer />
          <div className="display-flex-row">
            <div className="title-info">
              <div id="tv-status">
                <span style={{ opacity: "0.6" }}>
                  {formatDate(data.first_air_date)}
                </span>
                <span>
                  {data.number_of_seasons}{" "}
                  {data.number_of_seasons > 1 ? "Seasons" : "Season"}
                </span>
                <span>{data.in_production ? "ONGOING" : "AIRED"}</span>
              </div>
              <h1 id="tv-title">{data.name}</h1>
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
                  <i
                    className={`fa-${
                      added ? "solid" : "regular"
                    } fa-heart solid`}
                  ></i>{" "}
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
          <Videos name="Videos" id={params.id} media_type={"tv"} />
          <div style={{ marginBottom: "90px"}}>
            {cast.length > 0 && (
              <Caraousel name="Cast" data={cast} media_type={"person"} />
            )}
          </div>
          {recommendations.length > 0 && (
            <Caraousel
              name="Recommendations"
              data={recommendations}
              media_type={"tv"}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Tv;
