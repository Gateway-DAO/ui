import useTranslation from 'next-translate/useTranslation';

import { Button, ButtonProps } from '@mui/material';

import { useFollowUser } from '../../hooks/use-follow';

type Props = {
  userId: string;
} & ButtonProps;

export function FollowButtonUser({ userId, ...props }: Props) {
  const { t } = useTranslation('common');
  const { isFollowingUser, isLoading, onToggleFollow } = useFollowUser();
  const isFollowing = isFollowingUser(userId);
  return (
    <Button
      variant="contained"
      disabled={isLoading(userId)}
      onClick={() => onToggleFollow(userId, isFollowing)}
      {...props}
    >
      {isFollowing ? t('actions.unfollow') : t('actions.follow')}
    </Button>
  );
}
