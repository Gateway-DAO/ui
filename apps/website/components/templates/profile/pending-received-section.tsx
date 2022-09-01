import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { Button, Stack, Typography } from '@mui/material';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';

type Props = {
  username: string;
  wallet: string;
};

export function PendingReceivedSection({ wallet, username }: Props) {
  const { t } = useTranslation('notifications');
  const { onAccept, onReject } = useBidirectionFollow();
  const acceptMutation = useMutation(() => onAccept(wallet));
  const rejectMutation = useMutation(() => onReject(wallet));

  const isLoading = acceptMutation.isLoading || rejectMutation.isLoading;

  return (
    <Stack
      alignSelf="flex-start"
      direction="row"
      gap={3}
      sx={{ background: '#E5E5E514', px: 3, py: 2 }}
    >
      <Typography>
        @{username} {t('user-requested')}
      </Typography>
      <Stack direction="row" gap={1}>
        <Button
          disabled={isLoading}
          onClick={() => acceptMutation.mutate()}
          variant="contained"
        >
          {t('common:actions.accept')}
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => rejectMutation.mutate()}
          variant="outlined"
        >
          {t('common:actions.decline')}
        </Button>
      </Stack>
    </Stack>
  );
}
