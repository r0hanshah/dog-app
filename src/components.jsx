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

  const filteredBreeds = Object.keys(breeds).filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading breeds...</p>;
  }

  return (
    <div className="breed-selector">
      <input
        type="text"
        placeholder="Search breeds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBreeds.map((breed) => (
          <li key={breed}>
            <label>
              <input
                type="checkbox"
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleCheckboxChange(breed)}
              />
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </label>
            {breeds[breed].length > 0 && (
              <ul>
                {breeds[breed].map((subBreed) => {
                  const fullBreed = `${breed}-${subBreed}`;
                  return (
                    <li key={fullBreed}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedBreeds.includes(fullBreed)}
                          onChange={() => handleCheckboxChange(fullBreed)}
                        />
                        {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
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
