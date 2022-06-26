import { PropsWithChildren, useState } from 'react';

import { WalletModal } from '../../components/templates/landing/wallet-modal';
import useToggleContainerClass from '../../hooks/useToggleContainerClass';
import { ModalContext } from './context';

export function ModalProvider({ children }: PropsWithChildren<unknown>) {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  useToggleContainerClass('blur', isOpen);
  return (
    <ModalContext.Provider value={{ isOpen, open }}>
      {children}
      <WalletModal isOpen={isOpen} onClose={close} />
    </ModalContext.Provider>
  );
}
