import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';

import { Stack, Typography } from '@mui/material';

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

const TokenHoldContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { chain, token_address, quantity } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const { t } = useTranslation('gate-profile');

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {chains[chain]}
      </Typography>
      <Typography variant="caption">{t('tasks.token_hold.chain')}</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {token_address}
      </Typography>
      <Typography variant="caption">
        {t('tasks.token_hold.token_address')}
      </Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {quantity}
      </Typography>
      <Typography variant="caption">
        {t('tasks.token_hold.quantity')}
      </Typography>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          {t('common:actions.check-token')}
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          {t('tasks.completed-date', { date: formattedDate })}
        </Typography>
      )}
    </Stack>
  );
};

export default TokenHoldContent;
