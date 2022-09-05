import useTranslation from 'next-translate/useTranslation';

import { useMenu } from '@gateway/ui';

import { Button } from '@mui/material';

import { FollowButtonProps } from './type';

export function FriendSentPendingButton(props: FollowButtonProps) {
  const menu = useMenu();
  const { t } = useTranslation('common');

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={menu.onOpen}
      disabled
      {...props}
    >
      {t('actions.pending')}
    </Button>
  );
}
