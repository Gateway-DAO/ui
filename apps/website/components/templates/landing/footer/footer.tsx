import Link from 'next/link';
import React from 'react';

import { FaMedium } from 'react-icons/fa';

import { GatewayIcon, DiscordIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';

import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { DEFAULT_MAX_WIDTH, DEFAULT_PADDINGX } from '../styles';
import { IconContainer } from './styles';
import { FooterProps } from './types';

export function Footer({
  copyright,
  subscribe,
  receiveNews,
  subscribeButton,
}: FooterProps): JSX.Element {
  return (
    <Box
      component="footer"
      sx={() => ({
        mt: '20px',
        mb: '40px',
        width: '100%',
      })}
    >
      <Box
        sx={(theme) => ({
          border: '1px solid rgba(229, 229, 229, 0.12)',
          p: '48px',
          borderRadius: '24px',
          position: 'relative',
          background: theme.palette.background.elevated,
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            p: '24px',
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
              flexWrap: 'wrap',
            },
          })}
        >
          <Stack direction="column">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                component="h1"
                variant="body1"
                sx={{ display: 'flex' }}
              >
                <GatewayIcon
                  sx={(theme) => ({
                    width: 24,
                    height: 24,
                    marginRight: '12px',
                    mb: '32px',
                    [theme.breakpoints.down('sm')]: {
                      height: '24px',
                      width: '24px',
                    },
                  })}
                />
                Gateway
              </Typography>
              <List
                sx={() => ({
                  display: 'flex',
                  justifyContent: 'flex-start',
                  mb: '82px',
                })}
              >
                <ListItem sx={{ display: 'flex', width: 'auto', p: 0 }}>
                  <Link passHref href="twitter.com/gateway_xyz" target="_blank">
                    <IconContainer component="a">
                      <Twitter color="secondary" />
                    </IconContainer>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{ display: 'flex', width: 'auto', p: 0, ml: '8px' }}
                >
                  <Link
                    passHref
                    href="https://discord.com/invite/bxTaYsJ6WD"
                    target="_blank"
                  >
                    <IconContainer component="a">
                      <DiscordIcon />
                    </IconContainer>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{ display: 'flex', width: 'auto', p: 0, ml: '8px' }}
                >
                  <Link
                    passHref
                    href="https://www.linkedin.com/company/mygateway"
                    target="_blank"
                  >
                    <IconContainer component="a">
                      <LinkedIn color="secondary" />
                    </IconContainer>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{ display: 'flex', width: 'auto', p: 0, ml: '8px' }}
                >
                  <Link passHref href="#" target="_blank">
                    <IconContainer component="a">
                      <FaMedium color="white" size={18} />
                    </IconContainer>
                  </Link>
                </ListItem>
                <ListItem
                  sx={{ display: 'flex', width: 'auto', p: 0, ml: '8px' }}
                >
                  <Link
                    passHref
                    href="https://github.com/Gateway-DAO"
                    target="_blank"
                  >
                    <IconContainer component="a">
                      <GitHub color="secondary" />
                    </IconContainer>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Stack>
          <Stack direction={'column'} sx={{ maxWidth: '294px' }}>
            <Typography sx={{ mb: '16px' }}>{subscribe}</Typography>
            <Typography sx={{ mb: '16px' }}>{receiveNews}</Typography>
            <TextField
              sx={{ mb: '16px' }}
              variant="outlined"
              type="email"
              placeholder="E-mail"
            />
            <Link passHref href={'#'}>
              <Button
                variant="outlined"
                sx={() => ({
                  height: '42px',
                  display: 'flex',
                  width: '122px',
                  borderRadius: '20px',
                })}
              >
                {subscribeButton}
              </Button>
            </Link>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            sx={(theme) => ({
              mt: '-25px',
              [theme.breakpoints.down('sm')]: {
                mt: '64px',
              },
            })}
          >
            {copyright}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
