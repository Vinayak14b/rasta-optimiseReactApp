// CheckboxContext.js
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [pointLayersVisible, setPointLayersVisible] = useState(true);

  const togglePointLayers = () => {
    setPointLayersVisible((prev) => !prev);
  };

  return (
    <FilterContext.Provider value={{ pointLayersVisible, togglePointLayers }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useCheckboxContext = () => useContext(FilterContext);
