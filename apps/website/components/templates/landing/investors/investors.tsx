import Image from 'next/image';
import Link from 'next/link';
import React, { forwardRef } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, BoxTypeMap, List, ListItem, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { Investor, InvestorProps } from './types';

export const Investors = forwardRef<
  OverridableComponent<BoxTypeMap<Record<string, unknown>, 'div'>>,
  InvestorProps
>(function InvestorsComponent(
  { title, investorsWithLogos, investorsonlyNames, ...rest }: InvestorProps,
  ref
) {
  return (
    <Box
      ref={ref}
      component="section"
      {...rest}
      sx={(theme) => ({
        pt: '124px',
        pb: '20px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
          pt: '62px',
        },
      })}
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
              ...theme.typography.h6,
              maxWidth: '186px',
            },
          })}
        >
          {title}
        </Typography>
        <Box>
          <List
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr));',
              width: '100%',
              py: '70px',
              rowGap: '40px',
              columnGap: '48px',
              borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
              [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
              },
            })}
          >
            {investorsWithLogos.map((investor: Investor) => (
              <ListItem
                key={investor.name}
                sx={(theme) => ({
                  width: 'auto',
                  display: 'flex',
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1,
                  },
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },
                })}
              >
                <Image
                  src={investor.logo.url}
                  alt={investor.name}
                  layout="raw"
                  width={investor.logo.width}
                  height={investor.logo.height}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <List
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: 'auto auto auto auto',
            rowGap: '40px',
            pt: '60px',
            pb: '30px',
            columnGap: '58px',
            [theme.breakpoints.down('sm')]: {
              display: 'flex',
              flexDirection: 'column',
            },
          })}
        >
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
});
