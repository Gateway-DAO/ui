import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { useMenu } from '@gateway/ui';

import { Button, Menu, MenuItem } from '@mui/material';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';

export function FriendSentPendingButton({
  wallet,
  ...props
}: FollowButtonProps) {
  const menu = useMenu();
  const { t } = useTranslation('common');
  // const { onUnfollow } = useBidirectionFollow();
  // const unfollowMutation = useMutation(() => onUnfollow(wallet));
  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={menu.onOpen}
        disabled
        // isLoading={unfollowMutation.isLoading}
        {...props}
      >
        {t('actions.pending')}
      </Button>
      {/* <Menu anchorEl={menu.element} open={menu.isOpen} onClose={menu.onClose}>
        <MenuItem onClick={() => { unfollowMutation.mutate(); menu.onClose(); }}>{t('actions.withdraw')}</MenuItem>
      </Menu> */}
    </>
  );
}
