import React, { useEffect, useState } from "react";
import fetchData from "../API/tmdbApi";
import { useParams } from "react-router";
import { formatDate } from "../utils/Functions";
import Loader from "../Components/Loader";

const CastDetails = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchAndSetData = async () => {
      const data = await fetchData("", `/person/${params.id}`);
      setData(data);
      setLoading(false);
      document.title = `Person ⋮⋮ ${data.name}`;
    };

    fetchAndSetData();
  }, [params.id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="details-page">
            <div className="display-flex-row">
              <div className="title-info">
                <div>
                  <span style={{ opacity: "0.5", marginRight: "20px" }}>
                    {formatDate(data.birthday)} ⚪ {data.place_of_birth}
                  </span>
                  <span>{data.known_for_department}</span>
                </div>

                <h1 id="cast-title">{data.name}</h1>
                <div className="desc">
                  <p>{data.biography}</p>
                </div>
              </div>
              <div className="title-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CastDetails;
