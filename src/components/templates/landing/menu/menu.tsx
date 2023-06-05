import React, { useState } from 'react';

import { GatewayIcon } from '@/components/atoms/icons';
import { MotionBox } from '@/components/atoms/motion-components';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link, List, ListItem, Stack } from '@mui/material';

import { DEFAULT_MAX_WIDTH, DEFAULT_PADDINGX } from '../styles';
import { MenuProps } from './types';

export function Menu({
  connectButton,
  signUpButton,
  menuList,
  activeMenu,
}: MenuProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={(theme) => ({
        width: '100%',
        position: 'fixed',
        px: DEFAULT_PADDINGX,
        zIndex: 10,
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(16, 4, 28, 0) 100%)`,
        [theme.breakpoints.down('sm')]: {
          px: '20px',
        },
      })}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        py={4}
        sx={{
          position: 'relative',
          maxWidth: DEFAULT_MAX_WIDTH,
          left: '50%',
          transform: 'translate(-50%, 0)',
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
            [theme.breakpoints.down('md')]: {
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
              alignItems: 'center',
              py: 0,
              [theme.breakpoints.down('md')]: {
                marginRight: 'auto',
                ...(open && {
                  flexDirection: 'column',
                  width: '100%',
                  marginRight: 0,
                  alignItems: 'stretch',
                  position: 'relative',
                }),
              },
            })}
          >
            <Link href="#" sx={{ height: '34px' }}>
              <GatewayIcon
                sx={(theme) => ({
                  width: 34,
                  height: 34,
                  py: 0,
                  marginRight: '43px',
                  [theme.breakpoints.down('md')]: {
                    height: '24px',
                    width: '24px',
                  },
                })}
              />
            </Link>
            {open && (
              <CloseIcon
                color="secondary"
                fontSize="medium"
                onClick={() => setOpen(false)}
                sx={{
                  cursor: 'pointer',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              />
            )}
            <List
              role="menu"
              sx={(theme) => ({
                display: 'flex',
                py: 0,
                [theme.breakpoints.down('md')]: {
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
                      ...(activeMenu === menuItem.href.replace('#', '') && {
                        color: theme.palette.text.primary,
                      }),
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
                visibility: 'hidden',
                opacity: 0,
                px: 0,
                transition:
                  'visibility 250ms ease-in-out, opacity 250ms ease-in-out',
                '&:hover': { background: 'none', cursor: 'default' },
                ...(activeMenu !== 'hero' &&
                  activeMenu !== '' && {
                    visibility: 'visible',
                    opacity: 1,
                  }),
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
                px: 0,
                py: 0,
                pl: '8px',
                '&:hover': { background: 'none', cursor: 'default' },
                [theme.breakpoints.down('md')]: {
                  py: '8px',
                  px: '8px',
                  marginTop: '-23px',
                  ...(open && {
                    px: 0,
                    width: '100%',
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
        </MotionBox>
      </Stack>
    </Box>
  );
}
