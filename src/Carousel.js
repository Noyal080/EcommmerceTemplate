import React, { useEffect, useState } from "react";
import { Image, Container } from "semantic-ui-react";
import "./carousel.css";

const Carousel = ({ items, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container" style={{ ...style }}>
      <div className="carousel" style={{ "--current-index": currentIndex }}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <Image
              centered
              className="carousel-img"
              src={item.image}
              alt={`Slide ${index + 1}`}
            />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-prev" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="carousel-next" onClick={handleNext}>
        &#10095;
      </button>
      <div className="carousel-pagination">
        {items.map((_, index) => (
          <span
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
