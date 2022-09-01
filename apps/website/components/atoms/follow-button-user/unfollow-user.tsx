import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';

export function UnfollowUserButton({ wallet, ...props }: FollowButtonProps) {
  const { t } = useTranslation('common');
  const { onFollow } = useBidirectionFollow();
  const followMutation = useMutation(() => onFollow(wallet));

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      isLoading={followMutation.isLoading}
      onClick={() => followMutation.mutate()}
      {...props}
    >
      {t('unfollow')}
    </LoadingButton>
  );
}
