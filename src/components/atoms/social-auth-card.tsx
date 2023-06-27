import { useEffect, useState } from 'react';

import { brandColors } from '@/theme';

import {
  Icon,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
  alpha,
} from '@mui/material';

import { CheckedButton } from './buttons/check-button';

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  connectHandler?: AccountHandlerConnection;
  sx?: SxProps<Theme>;
};

export type AccountHandlerConnection = {
  isConnected: boolean;
  connect: any;
  disconnect: any;
  isLoading: boolean;
};

export function SocialAuthCard({
  icon,
  title,
  description,
  connectHandler,
  sx,
}: Props) {
  const [connectedState, setConnectedState] = useState(false);

  useEffect(() => {
    setConnectedState(connectHandler?.isConnected);
  }, [connectHandler?.isConnected]);

  const connectToggle = () => {
    if (connectedState) {
      setConnectedState(true);
      connectHandler.disconnect();
    } else {
      setConnectedState(false);
      connectHandler.connect();
    }
  };

  return (
    <Paper
      sx={{
        border: 1,
        padding: 3.5,
        borderRadius: 2,
        width: '100%',
        height: 223,
        borderColor: alpha(brandColors.grays.main, 0.12),
        ...(connectHandler?.isConnected && {
          backgroundColor: '#6DFFB91F',
          borderColor: '#6DFFB94D',
        }),
        ...sx,
      }}
      elevation={3}
    >
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Icon sx={{ height: '100%' }}>{icon}</Icon>
          <CheckedButton
            isLoading={connectHandler.isLoading}
            checked={connectedState}
            clickHandler={connectToggle}
            labelOn={'connected'}
            labelOff={'connect'}
            labelOffHover={'disconnect'}
          />
        </Stack>
        <Typography variant="subtitle1" color={'white'} gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption">{description}</Typography>
      </Stack>
    </Paper>
  );
}
