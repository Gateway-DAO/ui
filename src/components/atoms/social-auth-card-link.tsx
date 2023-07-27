import NextLink from 'next/link';
import { useState } from 'react';

import { brandColors } from '@/theme';

import {
  Icon,
  Link,
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
  href?: string;
  sx?: SxProps<Theme>;
};

export function SocialAuthCardLink({
  icon,
  title,
  description,
  href,
  sx,
}: Props) {
  const [isHover, setIsHover] = useState(false);
  const onFocus = () => setIsHover(true);
  const onBlur = () => setIsHover(false);

  return (
    <NextLink passHref href={href}>
      <Link
        component={(props) => <Paper component="a" {...props} />}
        sx={{
          alignItems: 'stretch',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          color: brandColors.white.main,
          textDecoration: 'none',
          border: 1,
          padding: 3.5,
          borderRadius: 2,
          width: '100%',
          height: 223,
          boxShadow: 'none',
          borderColor: alpha(brandColors.grays.main, 0.12),
          ...sx,
        }}
        elevation={3}
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Icon sx={{ height: '100%' }}>{icon}</Icon>
          <CheckButton
            component="span"
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
      </Link>
    </NextLink>
  );
}
