import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="loader">
        <Puff color="white" ariaLabel="puff-loading" visible={true} />
      </div>
    </>
  );
};

export default Loader;
