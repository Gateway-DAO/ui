import { MutableRefObject, useEffect, useState } from 'react';

export function useActiveScroll(myRefs: MutableRefObject<HTMLDivElement[]>) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollDefinitions = (index: number) => {
    const threshold = 250;

    return {
      max: myRefs.current[index].offsetTop - threshold,
      min: myRefs.current[index].offsetTop - 2 * threshold,
    };
  };

  const scrollTo = (index) => {
    window.scrollTo({
      top: scrollDefinitions(index).min + 50,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    function handleScrollEvent() {
      if (
        window.scrollY >= scrollDefinitions(activeIndex).max &&
        window.scrollY <
          scrollDefinitions(myRefs.current.length - 1).max + 50 &&
        activeIndex < myRefs.current.length - 1
      ) {
        setActiveIndex(activeIndex + 1);
      } else if (
        window.scrollY < scrollDefinitions(activeIndex).min &&
        activeIndex > 0 &&
        window.scrollY > scrollDefinitions(0).min - 1
      ) {
        setActiveIndex(activeIndex - 1);
      }
    }

    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [myRefs, activeIndex]);

  return { activeIndex, scrollTo };
}
