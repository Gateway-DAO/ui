import useTranslation from 'next-translate/useTranslation';

import { useAuth } from '@/providers/auth';

import { Button } from '@mui/material';

import { FollowUserButton } from './follow-user';
import { FriendReceivedPendingButton } from './pending-received';
import { FriendSentPendingButton } from './pending-sent';
import { FollowButtonProps } from './type';
import { UnfollowUserButton } from './unfollow-user';

// Mocked
enum BiConnState {
  Connected = 'connected',
  Pending = 'pending',
}

function useFollowStatus(_wallet: string) {
  return {
    status: null,
    type: null,
  };
}
// Mocked

export function FollowButtonUser(props: FollowButtonProps) {
  const { t } = useTranslation('common');
  const { me, onOpenLogin } = useAuth();
  const { wallet } = props;
  const { status, type } = useFollowStatus(wallet);

  if (!me)
    return (
      <Button variant="contained" onClick={onOpenLogin} {...props}>
        {t('actions.connect')}
      </Button>
    );

  if (status === BiConnState.Pending && type === 'sent') {
    return <FriendSentPendingButton {...props} />;
  }

  if (status === BiConnState.Pending && type === 'received') {
    return <FriendReceivedPendingButton {...props} />;
  }
  if (status === BiConnState.Connected) {
    return <UnfollowUserButton {...props} />;
  }

  return <FollowUserButton {...props} />;
}
