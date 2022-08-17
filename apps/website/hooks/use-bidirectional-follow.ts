import { BiConnectionType } from '@cyberlab/cyberconnect';

import { useCyberConnect } from '../providers/cyberconnect';

export const useBidirectionFollow = () => {
  const { cyberConnect } = useCyberConnect();

  const onFollow = (wallet: string) =>
    cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.INIT);
  const onAccept = (wallet: string) =>
    cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.ACCEPT);
  const onUnfollow = (wallet: string) =>
    cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.TERMINATE);

  const onToggleFollow = (wallet: string, isFollowing: boolean) =>
    isFollowing ? onUnfollow(wallet) : onFollow(wallet);
  return { onFollow, onUnfollow, onToggleFollow };
};
