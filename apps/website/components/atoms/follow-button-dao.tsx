import useTranslation from 'next-translate/useTranslation';

import { Button, ButtonProps } from '@mui/material';

import { useFollowDAO } from '../../hooks/use-follow';

type Props = {
  daoId: string;
} & ButtonProps;

export function FollowButtonDAO({ daoId, ...props }: Props) {
  const { t } = useTranslation('common');
  const { isFollowingDAO, isLoading, onToggleFollow } = useFollowDAO();
  const isFollowing = isFollowingDAO(daoId);
  return (
    <Button
      variant="contained"
      disabled={isLoading(daoId)}
      onClick={() => onToggleFollow(daoId, isFollowing)}
      {...props}
    >
      {isFollowing ? t('actions.unfollow') : t('actions.follow')}
    </Button>
  );
}
