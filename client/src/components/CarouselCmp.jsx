import React, { useEffect, useState } from "react";
import "../style/CarouselCmp.css";

const CarouselCmp = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const newIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentIndex(newIndex);
    }, 5000);
  });

  // dssdv
  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel-container">
      {/* <button className="prev-button" onClick={goToPrevSlide}>
        Prev
      </button> */}

      <div className="carousel">
        <div className="slide active">
          <img src={images[currentIndex]} alt="loading..." />
        </div>
      </div>

      {/* <button className="next-button" onClick={goToNextSlide}>
        Next
      </button> */}
    </div>
  );
};

export default CarouselCmp;
