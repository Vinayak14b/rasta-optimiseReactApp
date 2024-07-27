import { createContext, useState } from 'react';

export const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [buttonValue, setButtonValue] = useState('');
  const handleButtonClick1 = (value) => {
    setButtonValue(value);
  };

  return (
		<ButtonContext.Provider value={{ buttonValue, handleButtonClick1 }}>
			{children}
		</ButtonContext.Provider>
  );
};
