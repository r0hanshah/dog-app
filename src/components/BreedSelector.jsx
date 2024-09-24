import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getBreedsList } from '../services/dogApi';
import Select from 'react-select';

const BreedSelector = ({ selectedBreeds, setSelectedBreeds }) => {
  const [breeds, setBreeds] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await getBreedsList();
        const breedsData = response.data.message;
        setBreeds(breedsData);
        prepareOptions(breedsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };
    fetchBreeds();
  }, []);

  const prepareOptions = (breedsData) => {
    const optionsArray = [];

    for (const breed in breedsData) {
      if (breedsData[breed].length > 0) {
        // breed has sub-breeds
        breedsData[breed].forEach((subBreed) => {
          const fullBreedName = `${capitalize(subBreed)} ${capitalize(breed)}`;
          optionsArray.push({
            value: fullBreedName,
            label: fullBreedName,
            sortKey: capitalize(breed),
          });
        });
      } else {
        // breed has no sub-breeds
        const breedName = capitalize(breed);
        optionsArray.push({
          value: breedName,
          label: breedName,
          sortKey: breedName,
        });
      }
    }

    // sort options by class name (breed name)
    optionsArray.sort((a, b) => a.sortKey.localeCompare(b.sortKey));

    setOptions(optionsArray);
  };

  const capitalize = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setSelectedBreeds(selectedValues);
  };

  if (loading) {
    return <p>Loading breeds...</p>;
  }

  // set the selected options in the dropdown
  const selectedOptions = options.filter((option) =>
    selectedBreeds.includes(option.value)
  );

  return (
    <div className="breed-selector">
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Select breeds..."
        className="breed-select"
      />
    </div>
  );
};

BreedSelector.propTypes = {
  selectedBreeds: PropTypes.array.isRequired,
  setSelectedBreeds: PropTypes.func.isRequired,
};

export default BreedSelector;