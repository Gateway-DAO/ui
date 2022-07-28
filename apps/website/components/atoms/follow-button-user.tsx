import useTranslation from 'next-translate/useTranslation';

import { ButtonProps } from '@mui/material';

import { useFollowUser } from '../../hooks/use-follow';
import { LoadingButton } from './loading-button';

type Props = {
  userId: string;
} & ButtonProps;

export function FollowButtonUser({ userId, ...props }: Props) {
  const { t } = useTranslation('common');
  const { isFollowingUser, isLoading, onToggleFollow } = useFollowUser();
  const isFollowing = isFollowingUser(userId);
  return (
    <LoadingButton
      variant="contained"
      isLoading={isLoading(userId)}
      onClick={() => onToggleFollow(userId, isFollowing)}
      {...props}
    >
      {isFollowing ? t('actions.disconnect') : t('actions.connect')}
    </LoadingButton>
  );
}
