import logo from './logo.svg';
import BreedSelector from './components/BreedSelector';
import Gallery from './components/Gallery';
import React, { useState } from 'react';
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
      <Gallery selectedBreeds={selectedBreeds} />
    </div>
  );
}

export default App;
