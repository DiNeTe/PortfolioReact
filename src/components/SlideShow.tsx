import React, { useState } from "react";

type SlideshowProps = {
  images: string[];
};

const SlideShow: React.FC<SlideshowProps> = ({ images }) => {
  // variable d'état avec la valeur initiale définie à 0
  const [ImageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const goToPrevious = () => {
    setImageIndex((prevIndex) =>
      // Si l'indice actuel est supérieur à 0, l'indice diminu de 1, sinon retour à la dernière image du tableau, crée l'effet de boucle.
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const goToNext = () => {
    setImageIndex(
      (nextIndex) =>
        // Si nextIndex + 1 = images.length, alors modulo = 0, crée l'effet de boucle.
        (nextIndex + 1) % images.length
    );
  };

  return (
    <div className="slideshow-container">
      {images.length > 1 && (
        <>
          <div className="nav-btn">
            <button className="prev-btn" onClick={goToPrevious}>
              <img
                className="nav-slideshow"
                src="/icons/gotoprev.svg"
                alt="Image précédente"
              />
            </button>
            <button className="next-btn" onClick={goToNext}>
              <img
                className="nav-slideshow"
                src="/icons/gotonext.svg"
                alt="Image suivante"
              />
            </button>
          </div>
          <span className="counter">
            {`${ImageIndex + 1} / ${images.length}`}
          </span>
        </>
      )}
      <img
        className="slideshow-image"
        src={images[ImageIndex]}
        alt={`Photo n°: ${ImageIndex + 1}`}
        onError={() => setImageError(true)}
        onLoad={() => setImageError(false)}
      />
      {imageError && <p>Image not found</p>}
    </div>
  );
};

export default SlideShow;
