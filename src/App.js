import React, { useState } from 'react';
import BreedSelector from './components/BreedSelector';
import Gallery from './components/Gallery';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  return (
    <div className="App">
      <h1>Dog Breed Gallery</h1>
      <BreedSelector
        selectedBreeds={selectedBreeds}
        setSelectedBreeds={setSelectedBreeds}
      />
      {/* {selectedBreeds.length >= 0 ? (
        <Gallery selectedBreeds={selectedBreeds} />
      ) : (
        <Quiz setSelectedBreeds={setSelectedBreeds} />
      )} */}
              <Gallery selectedBreeds={selectedBreeds} />
              <Quiz setSelectedBreeds={setSelectedBreeds} />

    </div>
  );
}

export default App;
