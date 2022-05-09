import { useEffect } from 'react';

/** A React hook that toggles a classname on Next root component  */
export default function useToggleContainerClass(
  className: string,
  isActive: boolean
) {
  useEffect(() => {
    const root = document.getElementById('__next');
    if (isActive) {
      root.classList.add(className);
    } else {
      root.classList.remove(className);
    }
    return () => {
      root.classList.remove(className);
    };
  }, [className, isActive]);
}
