import { Button, Stack, Typography } from '@mui/material';

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

const TokenHoldContent = ({ data, completed, updatedAt, completeTask }) => {
  const { chain, token_address, quantity } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {chains[chain]}
      </Typography>
      <Typography variant="caption">Chain</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {token_address}
      </Typography>
      <Typography variant="caption">Token address</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {quantity}
      </Typography>
      <Typography variant="caption">Quantity</Typography>
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
        >
          Check Token
        </Button>
      )}
    </Stack>
  );
};

export default TokenHoldContent;
