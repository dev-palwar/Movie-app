import React from "react";
import YouTube from "react-youtube";

const Player = ({ id }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <>
      <YouTube className="iframe" videoId={id} opts={opts} />
    </>
  );
};

export default Player;
