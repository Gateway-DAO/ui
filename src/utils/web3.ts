/**
 * It returns a URL based on the chain ID
 * @param {number} chainID - The chain ID of the network you want to connect to.
 * @returns A string
 */
export const getExplorer = (chainID: number): string => {
  switch (chainID) {
    case 1:
      return 'https://etherscan.io';
    case 3:
      return 'https://ropsten.etherscan.io';
    case 4:
      return 'https://rinkeby.etherscan.io';
    case 5:
      return 'https://goerli.etherscan.io';
    case 6:
      return 'https://kovan.etherscan.io';
    case 10:
      return 'https://optimistic.etherscan.io';
    case 56:
      return 'https://bscscan.com';
    case 97:
      return 'https://testnet.bscscan.com';
    case 137:
      return 'https://polygonscan.com';
    case 42161:
      return 'https://arbiscan.io';
    case 80001:
      return 'https://mumbai.polygonscan.com';
    case 421611:
      return 'https://rinkeby-explorer.arbitrum.io';
    default:
      return 'https://etherscan.io';
  }
};

export const getSolanaExplorer = (chainName: string, text: string): string => {
  switch (chainName) {
    case 'devnet':
      return `https://solscan.io${text}?cluster=devnet`;
    default:
      return `https://solscan.io${text}`;
  }
};
