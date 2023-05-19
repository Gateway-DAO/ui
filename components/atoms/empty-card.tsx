import { ReactNode, useMemo } from 'react';

import { GateIcon } from 'apps/website/components/atoms/icons';

import { Avatar, Box, type BoxProps, Stack, Typography } from '@mui/material';

type Icon = 'gate';

type Props = {
  icon?: Icon | ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
} & BoxProps;

export function EmptyCard({
  icon = 'gate',
  title,
  subtitle,
  disabled,
  ...props
}: Props) {
  const renderIcon = useMemo(() => {
    switch (icon) {
      case 'gate':
        return <GateIcon />;
      default:
        return icon;
    }
  }, []);
  return (
    <Box
      {...props}
      sx={[
        {
          display: 'flex',
          justifyContent: 'center',
          borderRadius: 1,
          border: 1,
          px: 11 / 2,
        },
        disabled && {
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderColor: (theme) => theme.palette.divider,
        },
        !disabled && {
          borderStyle: 'dashed',
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: 'rgba(154, 83, 255, 0.08)',
        },
        props.component === 'a' &&
          !disabled && {
            textDecoration: 'none',
            transition: 'background-color 0.2s ease-in-out',
            '&:hover, &:active, &:focus': {
              outline: 0,
              backgroundColor: 'rgba(154, 83, 255, 0.2)',
            },
          },
        (props?.sx as any) ?? undefined,
      ]}
    >
      <Stack
        gap={1}
        alignItems="center"
        alignSelf="center"
        justifySelf="center"
        textAlign="center"
      >
        <Avatar>{renderIcon}</Avatar>
        <Typography variant="body1" color="text.primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
