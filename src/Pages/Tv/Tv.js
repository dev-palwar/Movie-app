import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchData from "../../Database/API/tmdbApi";
import Caraousel from "../../Components/Caraousel/Caraousel";
import Videos from "../../Components/Player/Video";
import Loader from "../../Components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Details from "../../Components/Details/Details";

const Tv = () => {
  const params = useParams();
  const [recommendations, setRecommandations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [cast, setCast] = useState({});
  const [ratings, setRating] = useState();

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
          <Details data={data} ratings={ratings} />
          <Videos name="Videos" id={params.id} media_type={"tv"} />
          <div style={{ marginBottom: "90px" }}>
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
