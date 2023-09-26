import React from "react";
import "../Styles/Skeleton.scss"

const CardSkeleton = () => {
  return (
    <div className="card">
      <div className="card-image skeleton">
        {/* Placeholder for the image */}
      </div>
      <div className="details">
        <div className="skeleton title"></div>
        <div className="skeleton date"></div>
        <div className="skeleton type"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
