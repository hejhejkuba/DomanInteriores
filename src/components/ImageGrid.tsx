import React, { useEffect, useState } from 'react';
import '../styles/ImageGrid.css';

const ImageGrid: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);

      // Generujemy ścieżki lokalne do obrazów
      const newImages = Array.from({ length: 25 }, (_, i) => `/DomanInteriores/imgTen/${i + 1}.png`);

      await new Promise(res => setTimeout(res, 1000)); // symulacja ładowania
      setImages(newImages);
      setLoading(false);
    };

    fetchImages();
  }, []);

  return (
      <>
        <h1>Wizualizacje Teneryfa</h1>
      <div className="image-grid-container">
        {loading ? (
            <div className="image-grid-loader-wrapper">
              <div className="image-grid-spinner"></div>
            </div>
        ) : (
            <div className="image-grid-wrapper">
              {images.map((src, index) => (
                  <img
                      key={index}
                      src={src}
                      alt={`Image ${index + 1}`}
                      className="image-grid-img"
                      draggable="false"
                      onClick={() => setSelectedImage(`/DomanInteriores/imgTen/${index + 1}.png`)}
                  />
              ))}
            </div>
        )}
      </div>
        {selectedImage && (
            <div className="fullscreen-overlay" onClick={() => setSelectedImage(null)}>
              <button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
              >
                ✕
              </button>
              <img src={selectedImage} alt="Fullscreen" className="fullscreen-image"/>
            </div>
        )}
      </>
  );

};

export default ImageGrid;
