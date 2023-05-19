import useTranslation from 'next-translate/useTranslation';

import { ButtonProps } from '@mui/material';

import { useFollowDAO, UseFollowProps } from '@/hooks/use-follow';
import { LoadingButton } from './loading-button';

type Props = {
  daoId: string;
} & UseFollowProps &
  ButtonProps;

export function FollowButtonDAO({
  daoId,
  onFollow,
  onUnfollow,
  ...props
}: Props) {
  const { t } = useTranslation('common');
  const { isFollowingDAO, isLoading, onToggleFollow } = useFollowDAO({
    onFollow,
    onUnfollow,
  });
  const isFollowing = isFollowingDAO(daoId);
  return (
    <LoadingButton
      variant="contained"
      isLoading={isLoading(daoId)}
      onClick={
        !props.disabled ? () => onToggleFollow(daoId, isFollowing) : undefined
      }
      {...props}
    >
      {isFollowing ? t('actions.unfollow') : t('actions.follow')}
    </LoadingButton>
  );
}
