// src/components/BreedSelector.jsx

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBreedsList } from '../services/dogApi';

const BreedSelector = ({ selectedBreeds, setSelectedBreeds }) => {
  const [breeds, setBreeds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreedsList();
        setBreeds(response.data.message);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const handleCheckboxChange = (breedName) => {
    setSelectedBreeds((prevBreeds) =>
      prevBreeds.includes(breedName)
        ? prevBreeds.filter((breed) => breed !== breedName)
        : [...prevBreeds, breedName]
    );
  };

  const getDisplayBreeds = () => {
    const displayBreeds = [];

    for (const breed in breeds) {
      if (breeds[breed].length > 0) {
        // Breed has sub-breeds; add each sub-breed
        breeds[breed].forEach((subBreed) => {
          const fullBreedName = `${capitalize(subBreed)} ${capitalize(breed)}`;
          if (fullBreedName.toLowerCase().includes(searchTerm.toLowerCase())) {
            displayBreeds.push(fullBreedName);
          }
        });
      } else {
        // Breed has no sub-breeds; add the breed itself
        const breedName = capitalize(breed);
        if (breedName.toLowerCase().includes(searchTerm.toLowerCase())) {
          displayBreeds.push(breedName);
        }
      }
    }

    return displayBreeds.sort();
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  if (loading) {
    return <p>Loading breeds...</p>;
  }

  const displayBreeds = getDisplayBreeds();

  return (
    <div className="breed-selector">
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {displayBreeds.map((breedName) => (
          <li key={breedName}>
            <label>
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breedName)}
                onChange={() => handleCheckboxChange(breedName)}
              />
              {breedName}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

BreedSelector.propTypes = {
  selectedBreeds: PropTypes.array.isRequired,
  setSelectedBreeds: PropTypes.func.isRequired,
};

export default BreedSelector;
