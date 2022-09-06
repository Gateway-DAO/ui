import useTranslation from 'next-translate/useTranslation';

import { useMutation } from 'react-query';

import { useMenu } from '@gateway/ui';

import { Menu, MenuItem } from '@mui/material';

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
  const menu = useMenu();

  return (
    <>
      <LoadingButton
        variant="contained"
        color="primary"
        isLoading={unfollowMutation.isLoading}
        onClick={menu.onOpen}
        {...props}
      >
        {t('actions.connected')}
      </LoadingButton>
      <Menu
        anchorEl={menu.element}
        open={menu.isOpen}
        onClose={() => {
          menu.onClose();
        }}
      >
        <MenuItem
          onClick={() => {
            menu.onClose();
            unfollowMutation.mutate();
          }}
        >
          {t('actions.disconnect')}
        </MenuItem>
      </Menu>
    </>
  );
}
