import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { useMenu } from '@gateway/ui';

import { Menu, MenuItem } from '@mui/material';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';

export function FriendReceivedPendingButton({
  wallet,
  ...props
}: FollowButtonProps) {
  const menu = useMenu();
  const { t } = useTranslation('common');
  const { onUnfollow } = useBidirectionFollow();
  const unfollowMutation = useMutation(() => onUnfollow(wallet));
  return (
    <>
      <LoadingButton
        variant="outlined"
        color="primary"
        onClick={menu.onOpen}
        isLoading={unfollowMutation.isLoading}
        {...props}
      >
        {t('actions.pending')}
      </LoadingButton>
      <Menu anchorEl={menu.element} open={menu.isOpen} onClose={menu.onClose}>
        <MenuItem onClick={menu.onClose}>{t('actions.reject')}</MenuItem>
      </Menu>
    </>
  );
}
