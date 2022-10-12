import { Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const chains = {
  1: 'Ethereum',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  6: 'Kovan',
  10: 'Optimistic (mainnet)',
  69: 'Optimistic (kovan)',
  56: 'Binance Smart Chain (mainnet)',
  97: 'Binance Smart Chain (testnet)',
  137: 'Polygon',
  80001: 'Polygon (Mumbai)',
  42161: 'Arbitrum',
  421611: 'Arbitrum Rinkeby',
};

const NFTHoldContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
  isAdmin,
}) => {
  const { chain, nft_address } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {chains[chain]}
      </Typography>
      <Typography variant="caption">Chain</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {nft_address}
      </Typography>
      <Typography variant="caption">NFT Contract Address</Typography>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: 5 }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          Check NFT
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default NFTHoldContent;
