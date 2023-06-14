import { FaEthereum } from 'react-icons/fa';
import { TbCurrencySolana } from 'react-icons/tb';

import { useEffect, useState } from 'react';

const icons = [<FaEthereum />, <TbCurrencySolana />];

enum Network {
  etherum,
  solana,
}

type Props = {
  network?: Network;
};

export function WalletIconsTransition({ network = null }: Props) {
  const [currentIconIndex, setIconIndex] = useState(0);

  if (network == Network.etherum) {
    return icons[0];
  }

  if (network == Network.solana) {
    return icons[1];
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIconIndex(currentIconIndex + 1);
    }, 3000); // 3 second

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIconIndex]);

  return icons[currentIconIndex % icons.length];
}
