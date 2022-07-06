import React from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';

import { ListItem, MenuList, Stack } from '@mui/material';

import { MenuProps } from './types';

export function Menu({ connectButton, menuList }: MenuProps): JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={TOKENS.CONTAINER_PX}
      py={4}
    >
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
      <GatewayIcon sx={{ width: 50, height: 50 }} />
      {connectButton}
    </Stack>
  );
}
