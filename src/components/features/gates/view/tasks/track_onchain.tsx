import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { useCountdown } from '@/hooks/use-countdown';
import { useAuth } from '@/providers/auth';
import { getChainName } from '@/utils/web3';
import { useToggle } from 'react-use';

import { Divider, Stack, Typography } from '@mui/material';

const TrackOnChainContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { chain, contract_address } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const { t } = useTranslation('gate-profile');
  const { me } = useAuth();
  const [startCountdown, setStartCountdown] = useToggle(true);
  const [disableCountdown, setDisableCountdown] = useToggle(true);
  const countdown = useCountdown({
    time: 30,
    trigger: startCountdown,
    disabled: disableCountdown,
  });

  return (
    <Stack alignItems="start">
      <Stack sx={{ mb: 3, mt: 3, width: '100%' }}>
        <Typography variant="caption" fontSize={14}>
          {t('tasks.track_onchain.chain')}
        </Typography>
        <Typography>{getChainName(chain)}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="caption" fontSize={14}>
          {t('tasks.track_onchain.contract_address')}
        </Typography>
        <Typography>{contract_address}</Typography>
      </Stack>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            setDisableCountdown(false);
            setStartCountdown();
            completeTask({
              wallet: me?.wallet,
            });
          }}
          isLoading={isLoading}
          disabled={countdown?.counting}
        >
          {t('common:actions.check_event')}
          {countdown?.counting ? ` (${countdown.time})` : ' '}
        </LoadingButton>
      )}
      {completed && !!updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          {t('tasks.completed-date', { date: formattedDate })}
        </Typography>
      )}
    </Stack>
  );
};

export default TrackOnChainContent;