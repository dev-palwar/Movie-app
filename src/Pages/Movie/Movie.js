import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchData from "../../Database/API/tmdbApi";
import Videos from "../../Components/Player/Video";
import Loader from "../../Components/Loader/Loader";
import Caraousel from "../../Components/Caraousel/Caraousel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Details from "../../Components/Details/Details";

const Movie = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [recommendations, setRecommandations] = useState([]);
  const [cast, setCast] = useState([]);
  const [ratings, setRatings] = useState(null);
  const [loading, setLoading] = useState(true);

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
        `/find/${data.imdb_id}`
      );
      console.log(movie);

      if (isMounted) {
        setCast(cast);
        setData(movie);
        setRecommandations(fetchedRecommandations.results);
        if (res.movie_results.length > 0) {
          setRatings(res.movie_results[0].vote_average);
        }
        setLoading(false);

        document.title = `Movie ⋮⋮ ${data.title}`;
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
          <Details data={data} ratings={ratings} />
          {Videos.length > 0 && (
            <Videos name="Videos" id={params.id} media_type={"movie"} />
          )}
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
