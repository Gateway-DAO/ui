import { Stack, Typography } from '@mui/material';

const TokenHoldContent = ({ data }) => {
  const { chain, token_address, quantity } = data;
  const uppercaseChain = chain.charAt(0).toUpperCase() + chain.slice(1);

  return (
    <Stack marginTop={5}>
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {uppercaseChain}
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
    </Stack>
  );
};

export default TokenHoldContent;
