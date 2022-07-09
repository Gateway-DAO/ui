import React, { useState } from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link, List, ListItem, Stack } from '@mui/material';

import { MenuProps } from './types';

export function Menu({
  connectButton,
  signUpButton,
  menuList,
}: MenuProps): JSX.Element {
  const [open, setOpen] = useState(false);

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
          height: '88px',
          px: '24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(229, 229, 229, 0.12)',
          maxHeight: '88px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out, height 0.3s ease-in-out',
          background: theme.palette.background.elevated,
          [theme.breakpoints.down('sm')]: {
            px: '16px',
            height: '56px',
            maxHeight: '56px',
            borderRadius: '28px',
            py: '16px',
            alignItems: 'flex-start',
            ...(open && {
              height: '570px',
              flexWrap: 'wrap',
              maxHeight: '570px',
            }),
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
              marginRight: 'auto',
              ...(open && {
                flexDirection: 'column',
              }),
            },
          })}
        >
          <GatewayIcon
            sx={(theme) => ({
              width: 50,
              height: 50,
              marginRight: '43px',
              [theme.breakpoints.down('sm')]: {
                height: '24px',
                width: '24px',
              },
            })}
          />
          <List
            role="menu"
            sx={(theme) => ({
              display: 'flex',
              [theme.breakpoints.down('sm')]: {
                ...(open && {
                  flexDirection: 'column',
                  width: '100%',
                  order: 3,
                }),
              },
            })}
          >
            {menuList.map((menuItem, index) => (
              <ListItem
                role="menuitem"
                key={menuItem.text + index}
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'center',
                  '&:hover, &:active': {
                    background: 'none',
                    cursor: 'default',
                  },
                  [theme.breakpoints.down('md')]: {
                    display: 'none',
                    ...(open && {
                      display: 'block',
                      width: '100%',
                      paddingBottom: '16px',
                      paddingLeft: '0',
                      borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
                      '&:last-child': {
                        borderBottom: 'none',
                      },
                      '&:first-child': {
                        paddingTop: '40px',
                      },
                    }),
                  },
                })}
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
          </List>
        </Box>
        <List
          role="menu"
          sx={{
            display: 'flex',
            ...(open && { order: 4, flexDirection: 'column', width: '100%' }),
          }}
        >
          <ListItem
            role="menuitem"
            sx={(theme) => ({
              '&:hover': { background: 'none', cursor: 'default' },
              [theme.breakpoints.down('md')]: {
                display: 'none',
                ...(open && {
                  display: 'block',
                  width: '100%',
                  px: 0,
                  a: {
                    width: '100%',
                    height: '36px',
                    marginTop: '100px',
                  },
                }),
              },
            })}
          >
            {signUpButton}
          </ListItem>
          <ListItem
            role="menuitem"
            sx={(theme) => ({
              '&:hover': { background: 'none', cursor: 'default' },
              [theme.breakpoints.down('sm')]: {
                marginTop: '-23px',
                ...(open && {
                  width: '100%',
                  px: 0,
                  py: 0,
                  flex: 1,
                  marginTop: '0px',
                }),
                a: {
                  width: '100%',
                  maxWidth: '100%',
                  height: '36px',
                },
              },
            })}
          >
            {connectButton}
          </ListItem>
        </List>

        {!open && (
          <MenuIcon
            color="secondary"
            fontSize="medium"
            onClick={() => setOpen(!open)}
            sx={(theme) => ({
              [theme.breakpoints.up('md')]: {
                display: 'none',
                cursor: 'pointer',
                ...(open && {
                  order: 4,
                }),
              },
            })}
          />
        )}

        {open && (
          <CloseIcon
            color="secondary"
            fontSize="medium"
            onClick={() => setOpen(false)}
            sx={(theme) => ({
              [theme.breakpoints.up('md')]: {
                display: 'none',
                cursor: 'pointer',
                ...(open && {
                  order: 4,
                }),
              },
            })}
          />
        )}
      </MotionBox>
    </Stack>
  );
}
