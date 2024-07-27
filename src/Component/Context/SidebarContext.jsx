// SidebarContext.js
import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [listViewOpen, setListViewOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ listViewOpen, setListViewOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
 