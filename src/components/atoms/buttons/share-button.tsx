import { useMenu } from '@/hooks/use-menu';

import { IosShare } from '@mui/icons-material';
import { Avatar, IconButton, SxProps } from '@mui/material';

import { ShareButtonFn } from './share-btn-fn';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  url?: string;
  description?: string;
  customComponent?: ReactNode;
  sx?: SxProps;
};

export function ShareButton(Props: Props) {
  const menu = useMenu();

  return (
    <>
      <IconButton
        sx={{
          p: 0,
          ...Props.sx,
        }}
        onClick={menu.onOpen}
        key="share"
      >
        {!Props.customComponent && (
          <Avatar sx={{ height: '30px', width: '31px' }}>
            <IosShare
              sx={{
                mt: -0.25,
                height: '20px',
              }}
            />
          </Avatar>
        )}

        {!!Props.customComponent && Props.customComponent}
      </IconButton>
      <ShareButtonFn {...{ ...Props, menu }} />
    </>
  );
}
