import { useRef, useState } from 'react';

import { useInterval } from 'react-use';

export const useRemainingTime = (
  isEnabled = true,
  initialTime = 0,
  percent = 0
) => {
  const timer = useRef(0);

  const [remainingTime, setRemainingTime] = useState<number | undefined>(
    undefined
  );

  useInterval(
    () => {
      timer.current += 1;
      if (timer.current >= 7) {
        const passedTime = (Date.now() - initialTime) / 1000;
        setRemainingTime(Math.floor(passedTime / percent - passedTime));
      }
    },
    isEnabled && percent < 1 ? 1500 : null
  );

  return remainingTime;
};
