import { useState } from 'react';

import { brandColors } from '@/theme';
import { AccountHandlerConnection } from '@/types/account';

import {
  ButtonBase,
  Icon,
  Paper,
  Stack,
  SxProps,
  Theme,
  Typography,
  alpha,
} from '@mui/material';

import { CheckButton } from './buttons/check-button';

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  connectHandler?: AccountHandlerConnection;
  sx?: SxProps<Theme>;
};

export function SocialAuthCard({
  icon,
  title,
  description,
  connectHandler,
  sx,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const onFocus = () => setIsHover(true);
  const onBlur = () => setIsHover(false);

  const connectToggle = () => {
    if (connectHandler?.isConnected) {
      connectHandler?.disconnect();
    } else {
      connectHandler?.connect();
    }
  };

  return (
    <ButtonBase
      component={Paper}
      sx={{
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        border: 1,
        padding: 3.5,
        borderRadius: 2,
        width: '100%',
        height: 223,
        boxShadow: 'none',
        borderColor: alpha(brandColors.grays.main, 0.12),
        ...(connectHandler?.isConnected && {
          backgroundColor: '#6DFFB91F',
          borderColor: '#6DFFB94D',
        }),
        ...sx,
      }}
      elevation={3}
      onClick={connectToggle}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Icon sx={{ height: '100%' }}>{icon}</Icon>
        <CheckButton
          component="span"
          isLoading={connectHandler?.isLoading}
          isChecked={connectHandler?.isConnected}
          clickHandler={connectToggle}
          labelOn={'connected'}
          labelOff={'connect'}
          labelOffHover={'disconnect'}
          isHover={isHover}
        />
      </Stack>
      <Typography variant="subtitle1" color={'white'} gutterBottom>
        {title}
      </Typography>
      <Typography variant="caption">{description}</Typography>
    </ButtonBase>
  );
}
