import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';

export function UnfollowUserButton({
  wallet,
  onSuccess,
  ...props
}: FollowButtonProps) {
  const { t } = useTranslation('common');
  const { onUnfollow } = useBidirectionFollow();
  const unfollowMutation = useMutation(() => onUnfollow(wallet), { onSuccess });

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      isLoading={unfollowMutation.isLoading}
      onClick={() => unfollowMutation.mutate()}
      {...props}
    >
      {t('actions.unfollow')}
    </LoadingButton>
  );
}
