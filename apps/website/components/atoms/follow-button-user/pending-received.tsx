import useTranslation from 'next-translate/useTranslation';

import { useMutation } from '@tanstack/react-query';

import { useMenu } from '@gateway/ui';

import { Menu, MenuItem } from '@mui/material';

import { useBidirectionFollow } from '../../../hooks/use-bidirectional-follow';
import { LoadingButton } from '../loading-button';
import { FollowButtonProps } from './type';

export function FriendReceivedPendingButton({
  wallet,
  onSuccess,
  ...props
}: FollowButtonProps) {
  const menu = useMenu();
  const { t } = useTranslation('common');
  const { onAccept, onReject } = useBidirectionFollow();
  const acceptMutation = useMutation(() => onAccept(wallet), { onSuccess });
  const rejectMutation = useMutation(() => onReject(wallet), { onSuccess });

  return (
    <>
      <LoadingButton
        variant="outlined"
        color="primary"
        onClick={menu.onOpen}
        isLoading={acceptMutation.isLoading || rejectMutation.isLoading}
        {...props}
      >
        {t('actions.pending')}
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
            acceptMutation.mutate();
          }}
        >
          {t('actions.accept')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            menu.onClose();
            rejectMutation.mutate();
          }}
        >
          {t('actions.reject')}
        </MenuItem>
      </Menu>
    </>
  );
}
