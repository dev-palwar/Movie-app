import React, { useEffect, useState } from "react";
import "../Watchlist/Watchlist.scss"
import { getUser } from "../../Database/Controllers/Database";
import { IoMdHeartDislike } from "react-icons/io";
import Loader from "../../Components/Loader/Loader";
import Card from "../../Components/Card/Card";

const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getUser();
      if (response && response.resFromDB) {
        setLoggedInUser(response.resFromDB);
        setLoading(false);
      }
      document.title = "Watchlist";
    })();
  },[]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : loggedInUser.watchlist && loggedInUser.watchlist.length === 0 ? (
        <EmptyWatchlist />
      ) : (
        <FullWatchlist data={loggedInUser.watchlist} />
      )}
    </>
  );
};

function EmptyWatchlist() {
  return (
    <div className="container">
      <div className="empty-watchlist">
        <IoMdHeartDislike className="dislikeHeart" />
        <h3>Empty watchlist</h3>
        <p>You can add movies to your favorites by clicking on the ♥ icon</p>
      </div>
    </div>
  );
}

function FullWatchlist({ data, func }) {
  return (
    <div>
      <h1 style={{ fontSize: "4.2rem", marginBottom: "10px" }}>Watchlist</h1>
      <div className="container">
        {data &&
          data.map((value) => (
            <Card
              key={value.id}
              id={value.id}
              image={value.image ?? value.image}
              title={value.name ?? value.name}
              media_type={value.media_type ?? value.media_type}
            />
          ))}
      </div>
    </div>
  );
}

export default Watchlist;
