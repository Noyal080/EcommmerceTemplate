import React, { useEffect, useState } from "react";
import { Image, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./carousel.css";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Container className="carousel-container">
      <div className="carousel" style={{ "--current-index": currentIndex }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <Image src={image} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Carousel;
