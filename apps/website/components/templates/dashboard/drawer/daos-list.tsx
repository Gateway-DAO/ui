import { PropsWithChildren } from 'react';

import List from '@mui/material/List';
import { alpha } from '@mui/system';

export function DaosList({ children }: PropsWithChildren<unknown>) {
  return (
    <List
      sx={{
        gap: 0.25,
        px: 0,
        display: 'flex',
        flexFlow: 'column',
        '.MuiListItem-root, .MuiListItemButton-root': {
          px: 2,
          py: 0.5,
          justifyContent: 'center',
          position: 'relative',
          ':before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 8,
            bottom: 8,
            width: 4,
            transform: 'scaleY(0)',
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            transition: '.1s ease-in',
            transitionProperty: 'transform, background-color',
          },
          ':hover,:focus': {
            background: 'transparent',
            ':before': {
              transform: 'scaleY(1)',
              background: (theme) => alpha(theme.palette.common.white, 0.5),
            },
          },
          '&.active:before': {
            transform: 'scaleY(1)',
            background: (theme) => theme.palette.common.white,
          },
        },
        '.MuiListItemIcon-root': {
          color: 'white',
          minWidth: 'auto',
        },
      }}
    >
      {children}
    </List>
  );
}
