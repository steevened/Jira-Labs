import { createContext } from 'react';

interface ContextProps {
  // toggle sidebar
  sideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  // add entries
  isAddingEntry: boolean;
  setIsAddingEntry: (action: boolean) => void;
  // drag entries
  isDragging: boolean;
  startDragging: () => void;
  endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
