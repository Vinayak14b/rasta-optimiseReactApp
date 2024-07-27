import { createContext, useContext, useRef } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const cleanupMap = () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  return (
    <MapContext.Provider value={{ mapContainer, map, cleanupMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  return useContext(MapContext);
};