// CheckboxContext.js
import { createContext, useContext, useState } from 'react';

const CheckboxContext = createContext();

export const CheckboxProvider = ({ children }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const toggleAllChecked = () => {
    setIsAllChecked((prevIsAllChecked) => !prevIsAllChecked);
  };

  return (
    <CheckboxContext.Provider value={{ isAllChecked, toggleAllChecked }}>
      {children}
    </CheckboxContext.Provider>
  );
};

export const useCheckboxContext = () => {
  const { isAllChecked } = useContext(CheckboxContext);
  return isAllChecked;
};

