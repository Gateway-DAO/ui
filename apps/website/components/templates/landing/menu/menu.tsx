import React from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { Button, Link, ListItem, MenuList, Stack } from '@mui/material';

import { MenuProps } from './types';

export function Menu({ connectButton, menuList }: MenuProps): JSX.Element {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={TOKENS.CONTAINER_PX}
      py={4}
      sx={{
        width: '100%',
        position: 'fixed',
        zIndex: 10,
        px: TOKENS.CONTAINER_PX,
      }}
    >
      <MotionBox
        sx={(theme) => ({
          width: '100%',
          display: 'flex',
          borderRadius: '88px',
          px: '24px',
          py: '27px',
          justifyContent: 'space-between',
          border: '1px solid rgba(229, 229, 229, 0.12);',
          background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        })}
      >
        <MenuList
          sx={{
            display: 'flex',
          }}
        >
          <GatewayIcon
            sx={{
              width: 50,
              height: 50,
              marginRight: '43px',
            }}
          />
          {menuList.map((menuItem, index) => (
            <ListItem
              key={menuItem.text + index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Link
                href={menuItem.href}
                sx={(theme) => ({
                  whiteSpace: 'nowrap',
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.text.primary,
                  },
                })}
                underline="none"
              >
                {menuItem.text}
              </Link>
            </ListItem>
          ))}
        </MenuList>
        <MenuList sx={{ display: 'flex' }}>
          <ListItem>{connectButton}</ListItem>
        </MenuList>
      </MotionBox>
    </Stack>
  );
}
