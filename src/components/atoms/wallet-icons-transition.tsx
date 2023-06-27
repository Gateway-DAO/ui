import { useEffect, useState } from 'react';

import { Protocol_Api_Chain } from '@/services/hasura/types';
import { FaEthereum } from 'react-icons/fa';
import { TbCurrencySolana } from 'react-icons/tb';

const icons = {
  [Protocol_Api_Chain.Evm]: <FaEthereum />,
  [Protocol_Api_Chain.Sol]: <TbCurrencySolana />,
};

type Props = {
  network?: Protocol_Api_Chain;
};

function AnimatedWallet() {
  const [currentIcon, setCurrentIcon] = useState<Protocol_Api_Chain>(
    Protocol_Api_Chain.Evm
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIcon((icon) =>
        icon === Protocol_Api_Chain.Evm
          ? Protocol_Api_Chain.Sol
          : Protocol_Api_Chain.Evm
      );
    }, 3000); // 3 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return icons[currentIcon];
}

export function WalletIconsTransition({ network = null }: Props) {
  if (!network) {
    return <AnimatedWallet />;
  }

  return icons[network];
}
