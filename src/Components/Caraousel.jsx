import React, { useRef } from "react";
import "../Styles/Caraousel.scss";
import Card from "./Card";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const Caraousel = ({ name, data, media_type }) => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -1000 : 1000;
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <>
      <div className="caraousel-container">
        <button
          className="carousel-button left"
          onClick={() => scrollCarousel("left")}
        >
          <AiFillCaretLeft />
        </button>
        <div className="caraousel" ref={carouselRef}>
          {data.map((value) => (
            <Card
              key={value.id}
              id={value.id}
              image={name == "Cast" ? value.profile_path : value.poster_path}
              title={value.title ?? value.name}
              release_date={value.release_date ?? value.first_air_date}
              media_type={media_type}
              character={value.character}
            />
          ))}
        </div>
        <button
          className="carousel-button right"
          onClick={() => scrollCarousel("right")}
        >
          <AiFillCaretRight />
        </button>
      </div>
    </>
  );
};

export default Caraousel;
