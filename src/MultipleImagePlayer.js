import React, { useState, useEffect, useRef } from "react";
import { Image, Icon } from "semantic-ui-react";
import "./Slider.css";

const MultipleImagePlayer = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const sliderRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
    scrollToCurrentImage(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
    scrollToCurrentImage(prevIndex);
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    scrollToCurrentImage(index);
  };

  const scrollToCurrentImage = (index) => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const selectedImg = slider.children[index];
      slider.scrollLeft = selectedImg.offsetLeft - slider.offsetLeft;
    }
  };

  const handleMouseMove = (e) => {
    if (isZoomed && imageContainerRef.current) {
      const { left, top, width, height } =
        imageContainerRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      imageContainerRef.current.children[1].style.transformOrigin = `${x}% ${y}%`;
    }
  };

  return (
    <div className="main-container">
      <div
        className="image-container"
        ref={imageContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Icon
          name="chevron left"
          size="large"
          circular
          color="black"
          onClick={handlePrev}
          className="prev-icon"
        />
        <Image
          src={selectedImage}
          size="huge"
          centered
          fluid
          style={{ transform: isZoomed ? "scale(2)" : "scale(1)" }}
        />
        <Icon
          name="chevron right"
          size="large"
          circular
          onClick={handleNext}
          className="next-icon"
        />
      </div>

      <div className="image-slider" ref={sliderRef}>
        {images.map((image, index) => (
          <Image
            centered
            size="small"
            key={index}
            src={image}
            alt={`Product ${index + 1}`}
            onClick={() => handleImageClick(index)}
            className={selectedImage === image ? "selected-image" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleImagePlayer;
