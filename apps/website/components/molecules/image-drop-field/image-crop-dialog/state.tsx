import { useState } from 'react';

export const useImageCropState = () => {
  const [cropModalState, setCropModalState] = useState<{
    isOpen?: boolean;
    image?: string;
  }>({
    isOpen: false,
  });

  const onOpen = (image: string) => {
    setCropModalState({
      isOpen: true,
      image,
    });
  };

  const onClose = () => {
    setCropModalState({ isOpen: false });
  };

  return {
    ...cropModalState,
    onOpen,
    onClose,
  };
};
