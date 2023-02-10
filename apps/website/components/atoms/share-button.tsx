import { ShareButtonFn } from './share-btn-fn';

import { useMenu } from '@gateway/ui';

import { IosShare } from '@mui/icons-material';
import { Avatar, IconButton, Stack } from '@mui/material';

type Props = {
  title?: string;
  url?: string;
};

export function ShareButton(Props: Props) {
  const menu = useMenu();

  return (
    <Stack sx={{ height: '27px' }}>
      <IconButton
        sx={{
          p: 0,
        }}
        onClick={menu.onOpen}
        key="share"
      >
        <Avatar>
          <IosShare
            sx={{
              mt: -0.25,
            }}
          />
        </Avatar>
      </IconButton>
      <ShareButtonFn {...{ ...Props, menu }} />
    </Stack>
  );
}
