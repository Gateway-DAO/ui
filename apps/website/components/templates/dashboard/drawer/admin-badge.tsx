import { PropsWithChildren } from 'react';

import { CrownIcon } from '@gateway/assets';

import { Badge } from '@mui/material';

export function AdminBadge({ children }: PropsWithChildren<unknown>) {
  return (
    <Badge
      color="primary"
      overlap="circular"
      badgeContent={<CrownIcon sx={{ height: 12, width: 12 }} />}
      sx={{
        '& .MuiBadge-badge': {
          boxSizing: 'content-box',
          width: 16,
          height: 16,
          padding: 0,
          borderRadius: '100%',
          minWidth: 'unset',
          border: 2,
          borderColor: (theme) => theme.palette.background.default,
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      {children}
    </Badge>
  );
}
