import useTranslation from 'next-translate/useTranslation';

import { Button } from '@mui/material';

import { useAuth } from '../../../providers/auth';
import { BiConnState } from '../../../services-cyberconnect/types.generated';
import { FollowUserButton } from './follow-user';
import { FriendReceivedPendingButton } from './pending-received';
import { FriendSentPendingButton } from './pending-sent';
import { FollowButtonProps } from './type';
import { UnfollowUserButton } from './unfollow-user';
import { useFollowStatus } from './utils';

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
