import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBreedImages, getSubBreedImages } from '../services/dogApi';

const Gallery = ({ selectedBreeds }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  const fetchImages = async () => {
    setLoading(true);
    let allImages = [];

    try {
      for (const breed of selectedBreeds) {
        let breedImages;
        if (breed.includes(' ')) {
          // Breed is in "Sub-breed Breed" format
          const [subBreedName, breedName] = breed.split(' ');
          breedImages = await getSubBreedImages(
            breedName.toLowerCase(),
            subBreedName.toLowerCase()
          );
        } else {
          // Breed has no sub-breeds
          breedImages = await getBreedImages(breed.toLowerCase());
        }
        allImages = [...allImages, ...breedImages.data.message];
      }
      setImages(allImages);
      setCurrentPage(1); // Reset to page 1 when new images are fetched
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

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div>
      <div className="gallery">
        {currentImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt="Dog" />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < totalPages ? prev + 1 : prev
            )
          }
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Gallery.propTypes = {
  selectedBreeds: PropTypes.array.isRequired,
};

export default Gallery;