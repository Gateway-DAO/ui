import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, List, ListItem, Typography } from '@mui/material';

import { Investor, InvestorProps } from './types';

export function Investors({
  title,
  investorsWithLogos,
  investorsonlyNames,
  ...rest
}: InvestorProps) {
  return (
    <Box
      component="section"
      {...rest}
      sx={() => ({ px: TOKENS.CONTAINER_PX, pt: '80px', pb: '40px' })}
    >
      <Box
        sx={() => ({
          padding: '48px',
          border: '1px solid rgba(229, 229, 229, 0.12)',
          borderRadius: '24px',
        })}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={(theme) => ({
            pb: '24px',
            [theme.breakpoints.down('sm')]: {
              ...theme.typography.h4,
            },
          })}
        >
          {title}
        </Typography>
        <Box>
          <List
            sx={() => ({
              display: 'flex',
              pb: '70px',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
            })}
          >
            {investorsWithLogos.map((investor: Investor) => (
              <ListItem
                key={investor.name}
                sx={(theme) => ({
                  width: 'auto',
                  display: 'flex',
                  py: '20px',
                  opacity: 0.6,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 1,
                  },
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    justifyContent: 'center',
                  },
                })}
              >
                <Link passHref href={investor.url}>
                  <Image
                    src={investor.logo.url}
                    alt={investor.name}
                    layout="raw"
                    width={investor.logo.width}
                    height={investor.logo.height}
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        <List sx={{ display: 'flex', flexWrap: 'wrap', pt: '40px' }}>
          {investorsonlyNames.map((investor: Investor) => (
            <ListItem
              key={investor.name}
              sx={() => ({
                display: 'flex',
                py: '20px',
                width: 'auto',
                flexShrink: 0,
              })}
            >
              <Link passHref href={investor.url}>
                <Typography
                  component="span"
                  variant="body1"
                  sx={() => ({
                    opacity: 0.6,
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 1,
                    },
                  })}
                >
                  {investor.name}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
