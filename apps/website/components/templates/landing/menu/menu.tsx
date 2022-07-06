import React from 'react';

import { ListItem, MenuList, Stack } from '@mui/material';

import { MenuListProps } from './types';

export function Menu({ menuList }: MenuListProps): JSX.Element {
  return (
    <Stack sx={{ flex: 1, width: '100%' }}>
      <MenuList>
        {menuList.map((menuItem, index) => (
          <ListItem
            component="a"
            key={menuItem.text + index}
            href={menuItem.href}
          >
            {menuItem.text}
          </ListItem>
        ))}
      </MenuList>
    </Stack>
  );
}
