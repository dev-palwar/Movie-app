import React, { useEffect, useState } from "react";
import fetchData from "../API/tmdbApi";
import Modal from "./Modal";

const Videos = ({ name, id, media_type }) => {
  const [data, setData] = useState([]);
  const [videoID, setVideoId] = useState();

  const handler = () => {
    document.getElementsByClassName("videoButton")[0].click();
  };

  useEffect(() => {
    const fetchAndSetData = async (id, media_type) => {
      const fetchedData = await fetchData("", `/${media_type}/${id}/videos`);
      setData(fetchedData.results);
    };

    fetchAndSetData(id, media_type);
  }, [id]);

  return (
    <>
      {data.length > 0 && (
        <div
          className="video-caraousel"
          style={{ marginTop: "70px", marginBottom: "60px" }}
        >
          <div className="caraousel" style={{ marginTop: "2px" }}>
            {data.map((value) => {
              return (
                <div className="videos" key={value.id}>
                  <img
                  loading="lazy"
                    style={{ cursor: "pointer" }}
                    src={`https://img.youtube.com/vi/${value.key}/mqdefault.jpg`}
                    alt={value.name}
                    onClick={() => {
                      setVideoId(value.key);
                      handler();
                    }}
                  />
                  <h3 style={{ fontWeight: "100" }}>{value.name}</h3>
                </div>
              );
            })}
          </div>
          <Modal id={videoID} />
        </div>
      )}
    </>
  );
};

export default Videos;
