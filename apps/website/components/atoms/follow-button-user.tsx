import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useMutation } from 'react-query';
import { useAccount } from 'wagmi';

import { Button, ButtonProps } from '@mui/material';

import { useBidirectionFollow } from '../../hooks/use-bidirectional-follow';
import { useAuth } from '../../providers/auth';
import { useCyberConnect } from '../../providers/cyberconnect';
import { BiConnState } from '../../services-cyberconnect/types.generated';
import { LoadingButton } from './loading-button';

type Props = {
  wallet: string;
} & ButtonProps;

export function FollowButtonUser({ wallet, ...props }: Props) {
  const { t } = useTranslation('common');
  const { me, onOpenLogin } = useAuth();
  const { data: account } = useAccount();
  const { friendRequestsSent, onResetCyberConnectProfile } = useCyberConnect();

  const { onToggleFollow } = useBidirectionFollow();

  const status =
    me && account?.address
      ? friendRequestsSent.find(
          (request) => request.from === account.address && request.to === wallet
        )?.state
      : BiConnState.Empty;

  const onFollow = useMutation(async () => {
    await onToggleFollow(wallet, status === BiConnState.Connected);
    return onResetCyberConnectProfile();
  });

  const label = useMemo(() => {
    if (!me) {
      return t('follow');
    }
    switch (status) {
      case BiConnState.Connected:
        return t('unfollow');
      case BiConnState.Pending:
        return t('pending');
      default:
        return t('follow');
    }
  }, [me, status]);

  if (!me)
    return (
      <Button variant="contained" onClick={onOpenLogin} {...props}>
        {t('follow')}
      </Button>
    );

  return (
    <LoadingButton
      variant="contained"
      isLoading={onFollow.isLoading}
      onClick={() => onFollow.mutate()}
      {...props}
    >
      {label}
    </LoadingButton>
  );
}
