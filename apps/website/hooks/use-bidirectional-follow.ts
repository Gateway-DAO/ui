import { BiConnectionType } from '@cyberlab/cyberconnect';

import { useCyberConnect } from '../providers/cyberconnect';

export const useBidirectionFollow = () => {
  const { cyberConnect, onRefetch } = useCyberConnect();

  const onFollow = async (wallet: string) => {
    await cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.INIT);
    return onRefetch();
  };
  const onAccept = async (wallet: string) => {
    await cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.ACCEPT);
    return onRefetch();
  };
  const onReject = async (wallet: string) => {
    await cyberConnect?.bidirectionalConnect(wallet, BiConnectionType.REJECT);
    return onRefetch();
  };
  const onUnfollow = async (wallet: string) => {
    await cyberConnect?.bidirectionalConnect(
      wallet,
      BiConnectionType.TERMINATE
    );
    return onRefetch();
  };

  const onToggleFollow = (wallet: string, isFollowing: boolean) =>
    isFollowing ? onUnfollow(wallet) : onFollow(wallet);
  return { onFollow, onAccept, onReject, onUnfollow, onToggleFollow };
};
