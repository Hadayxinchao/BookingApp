import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const PlaceContext = createContext([]);

export const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPlaces = async () => {
    const { data } = await axios.get('/places');
    setPlaces(data.places);
    setLoading(false);
  };
    
  useEffect(() => {
    getPlaces().then(() => {});
  }, []);

  return (
    <PlaceContext.Provider
      value={{ places, setPlaces, loading, setLoading, getPlaces }}
    >
      {children}
    </PlaceContext.Provider>
  );
};