import Link from 'next/link';
import React from 'react';

import { GatewayIcon } from '@gateway/assets';
import { TOKENS } from '@gateway/theme';

import { LinkedIn, Twitter } from '@mui/icons-material';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';

export function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        my: '20px',
        px: TOKENS.CONTAINER_PX,
      })}
    >
      <Box
        sx={(theme) => ({
          border: '1px solid rgba(229, 229, 229, 0.12)',
          p: '48px',
          borderRadius: '24px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          background: theme.palette.background.elevated,
        })}
      >
        <Stack direction="column">
          <Box>
            <Typography component="h1" variant="h4">
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
              Gateway
            </Typography>
            <List>
              <ListItem>
                <Link passHref href="#">
                  <Button>
                    <Twitter />
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link passHref href="#">
                  <Button>
                    <Twitter />
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link passHref href="#">
                  <Button>
                    <LinkedIn />
                  </Button>
                </Link>
              </ListItem>
            </List>
            <Typography>
              Copyright © 2022 Gateway. All rights reserved.
            </Typography>
          </Box>
          <Box>
            <Typography>Subscribe to our newsletter</Typography>
            <Typography>
              Receive news about developments and updates.
            </Typography>
            <Input type="email" placeholder="E-mail" />
            <Link passHref href={'#'}>
              <Button
                variant="outlined"
                size="large"
                sx={(theme) => ({
                  height: '42px',
                })}
              >
                Subscribe
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
