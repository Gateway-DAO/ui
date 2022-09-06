import { ReactNode } from 'react';

import { useMutation, useQuery } from 'react-query';
import { PartialDeep } from 'type-fest';

import { useBidirectionFollow } from '../../../../hooks/use-bidirectional-follow';
import { useCyberConnect } from '../../../../providers/cyberconnect';
import { gqlAnonMethods } from '../../../../services/api';
import { Users } from '../../../../services/graphql/types.generated';
import type { Notification } from '../../../../types/cyberconnect';

export type Methods = {
  isLoading?: boolean;
  user: PartialDeep<Users>;
  onRead?: () => void;
  onAccept: () => void;
  onReject: () => void;
};

type Props = Pick<Notification, 'id' | 'hasRead' | 'fromAddress'> & {
  children: (props: Methods) => ReactNode;
};

/**
 * Notification Wrapper for fetching user data and passing to children
 */
export function NotificationMethods({
  id,
  fromAddress,
  hasRead,
  children,
}: Props) {
  const { cyberConnect, onRefetch } = useCyberConnect();
  const { onAccept, onReject } = useBidirectionFollow();
  const readNotification = useMutation(['read-notification', id], async () => {
    await cyberConnect.ackNotifications([id]);
    onRefetch();
  });

  // Only enables read notification if not already read
  const onRead =
    !hasRead && readNotification.isIdle
      ? () => readNotification.mutate()
      : undefined;

  const userQuery = useQuery(
    ['user-wallet', fromAddress],
    () => gqlAnonMethods.user_from_wallet({ wallet: fromAddress }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const acceptMutation = useMutation(() => onAccept(fromAddress));
  const rejectMutation = useMutation(() => onReject(fromAddress));

  const user = userQuery.data;

  if (!user) return null;

  return (
    <>
      {children({
        user,
        onRead,
        isLoading: acceptMutation.isLoading || rejectMutation.isLoading,
        onAccept: () => acceptMutation.mutate(),
        onReject: () => rejectMutation.mutate(),
      })}
    </>
  );
}
