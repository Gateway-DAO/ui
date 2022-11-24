import useTranslation from 'next-translate/useTranslation';

import { useMutation } from '@tanstack/react-query';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';
import { useAuth } from 'apps/website/providers/auth';

export function FollowUserButton({
  wallet,
  onSuccess,
  ...props
}: FollowButtonProps) {
  const { t } = useTranslation('common');
  const { me } = useAuth();
  const { onFollow } = useBidirectionFollow();
  const followMutation = useMutation(() => onFollow(wallet), { onSuccess });

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      isLoading={followMutation.isLoading}
      onClick={() => {
        followMutation.mutate(null, {
          onSuccess: () =>
            fetch('/api/notify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                queueUrl: process.env.NEXT_PUBLIC_FRIEND_REQUEST_QUEUE_URL,
                body: {
                  requester: me?.username,
                  requester_pfp: me?.pic_id,
                  target: wallet,
                },
              }),
            }),
        });
      }}
      {...props}
    >
      {t('actions.connect')}
    </LoadingButton>
  );
}
