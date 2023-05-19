import { useMenu } from 'apps/website/hooks/use-menu';

import { IosShare } from '@mui/icons-material';
import { Avatar, IconButton, Stack } from '@mui/material';

import { ShareButtonFn } from './share-btn-fn';

type Props = {
  title?: string;
  url?: string;
  description?: string;
};

export function ShareButton(Props: Props) {
  const menu = useMenu();

  return (
    <>
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={menu.onOpen}
        key="share"
      >
        <Avatar sx={{ height: '30px', width: '31px' }}>
          <IosShare
            sx={{
              mt: -0.25,
              height: '20px',
            }}
          />
        </Avatar>
      </IconButton>
      <ShareButtonFn {...{ ...Props, menu }} />
    </>
  );
}
