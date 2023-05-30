/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type NavContextProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const NavContext = createContext<NavContextProps>({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export const useNav = () => useContext(NavContext);

export const NavStateProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return (
    <NavContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </NavContext.Provider>
  );
};
