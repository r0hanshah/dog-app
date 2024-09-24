import axios from 'axios';

const API_BASE_URL = 'https://dog.ceo/api';


export const getBreedsList = async () => {
    return await axios.get(`${API_BASE_URL}/breeds/list/all`);
  };
  
  export const getBreedImages = async (breed) => {
    return await axios.get(`${API_BASE_URL}/breed/${breed}/images`);
  };
  
  export const getSubBreedImages = async (breed, subBreed) => {
    return await axios.get(`${API_BASE_URL}/breed/${breed}/${subBreed}/images`);
  };