import { useAuth } from '../../../providers/auth';
import { useCyberConnect } from '../../../providers/cyberconnect';
import { BiConnState } from '../../../services/cyberconnect/types';

export const useFollowStatus = (
  wallet: string
): { status: BiConnState; type?: 'received' | 'sent' } => {
  const { friendsRequestsInbox, friendRequestsSent, friends } =
    useCyberConnect();
  const { me } = useAuth();
  if (!me) return { status: BiConnState.Empty };

  const friend = friends.find((f) => f.address === wallet);
  if (friend) return { status: friend.state };

  if (friendsRequestsInbox.some((f) => f.from === wallet))
    return { status: BiConnState.Pending, type: 'received' };
  if (friendRequestsSent.some((f) => f.to === wallet))
    return { status: BiConnState.Pending, type: 'sent' };
  return { status: BiConnState.Empty };
};
