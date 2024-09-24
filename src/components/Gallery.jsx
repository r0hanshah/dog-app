import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBreedImages, getSubBreedImages } from '../services/dogApi';

const Gallery = ({ selectedBreeds }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    let allImages = [];

    try {
      for (const breed of selectedBreeds) {
        let breedImages;
        if (breed.includes('-')) {
          const [mainBreed, subBreed] = breed.split('-');
          breedImages = await getSubBreedImages(mainBreed, subBreed);
        } else {
          breedImages = await getBreedImages(breed);
        }
        allImages = [...allImages, ...breedImages.data.message];
      }
      setImages(allImages);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      fetchImages();
    } else {
      setImages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBreeds]);

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div className="gallery">
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt="Dog" />
      ))}
    </div>
  );
};

Gallery.propTypes = {
  selectedBreeds: PropTypes.array.isRequired,
};

export default Gallery;
