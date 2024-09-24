import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBreedImages, getSubBreedImages } from '../services/dogApi';
import sadsnoopy from '../assets/sadsnoopy.jpg'; 


const Gallery = ({ selectedBreeds }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 20;

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  const fetchImages = async () => {
    setLoading(true);
    let allImages = [];

    try {
      for (const breed of selectedBreeds) {
        let breedImagesResponse;
        let breedNameDisplay;

        if (breed.includes(' ')) {
          // Breed is in "Sub-breed Breed" format
          const [subBreedName, breedName] = breed.split(' ');
          breedImagesResponse = await getSubBreedImages(
            breedName.toLowerCase(),
            subBreedName.toLowerCase()
          );
          breedNameDisplay = `${capitalize(subBreedName)} ${capitalize(breedName)}`;
        } else {
          // Breed has no sub-breeds
          breedImagesResponse = await getBreedImages(breed.toLowerCase());
          breedNameDisplay = capitalize(breed);
        }

        // Map images to include breed name
        const breedImages = breedImagesResponse.data.message.map((imageUrl) => ({
          url: imageUrl,
          breed: breedNameDisplay,
        }));

        allImages = [...allImages, ...breedImages];
      }

      setImages(allImages);
      setCurrentPage(1); // sets to page 1 when new images are fetched
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
    return (
      <div className="sadsnoopy">
        <img src={sadsnoopy} alt="No images available :(" />
        <p>No images to display :(</p>
      </div>
    );
  }

  return (
    <div>
      <div className="gallery">
      {currentImages.map((image, index) => (
        <div className="gallery-item" key={index}>
          <img
            src={image.url}
            alt={`A ${image.breed}`}
          />
          <div className="overlay">{image.breed}</div>
        </div>
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
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
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