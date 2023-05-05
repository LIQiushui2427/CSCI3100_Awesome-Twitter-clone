import { useState } from 'react';
/*
This is the code for the useModal component.
It will be used to display the modal on the home page.
*/

export function useModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { open, openModal, closeModal };
}






/*
import React, { useState } from 'react';

const ModalContext = React.createContext();

export function ModalProvider(props) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const modal = { open, openModal, closeModal };

  return <ModalContext.Provider value={modal} {...props} />;
}

export function useModal() {
  const context = React.useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

*/