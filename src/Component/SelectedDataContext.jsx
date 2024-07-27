import { createContext, useContext, useState } from "react";

const SelectedDataContext = createContext();

export const useSelectedData = () => {
  return useContext(SelectedDataContext);
};

export const SelectedDataProvider = ({ children }) => {
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [showRci, setShowRci] = useState(true);
  const [showPdfDownloadModal, setShowPdfDownloadModal] = useState(false);
  const [comparisonViewLevel, setComparisonViewLevel] = useState(null);
  const [comparisonViewData, setComparisonViewData] = useState(null); // [region, circle, division, road
  const setItemSelectedData = (data) => {
    setSelectedItemData(data);
  };

  return (
    <SelectedDataContext.Provider
      value={{
        selectedItemData,
        setItemSelectedData,
        showRci,
        setShowRci,
        showPdfDownloadModal,
        setShowPdfDownloadModal,
        comparisonViewLevel,
        setComparisonViewLevel,
        comparisonViewData,
        setComparisonViewData,
      }}
    >
      {children}
    </SelectedDataContext.Provider>
  );
};
