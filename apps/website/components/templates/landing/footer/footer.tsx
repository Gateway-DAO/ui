import Link from 'next/link';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaMedium } from 'react-icons/fa';
import { useMutation } from 'react-query';

import { GatewayIcon, DiscordIcon } from '@gateway/assets';

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

import { gqlAnonMethods } from '../../../../services/api';
import { IconContainer } from './styles';
import { FooterProps, subscribeToNewsletterSchema } from './types';

export function Footer({
  copyright,
  subscribe,
  receiveNews,
  subscribeButton,
  successMessage,
}: FooterProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(subscribeToNewsletterSchema),
    defaultValues: {
      email: '',
    },
  });
  const { mutate: subscribeToNewsletter } = useMutation(
    'subscribeToNewsletter',
    gqlAnonMethods.subscribe_to_newsletter
  );

  const onSubmit = async ({ email }, e) => {
    try {
      const response = await subscribeToNewsletter({ email });
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const onError = (errors, e) => console.log(errors, e);

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
          <Stack
            direction={'column'}
            sx={{ maxWidth: '294px' }}
            component="form"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <Typography sx={{ mb: '16px' }}>{subscribe}</Typography>
            <Typography
              sx={(theme) => ({
                mb: '16px',
                color: theme.palette.text.secondary,
              })}
            >
              {receiveNews}
            </Typography>
            {!isSubmitSuccessful && (
              <>
                <TextField
                  sx={{ mb: '16px' }}
                  variant="outlined"
                  type="email"
                  name="email"
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                  {...register('email', { required: true })}
                  placeholder="E-mail"
                />
                <Button
                  variant="outlined"
                  type="submit"
                  sx={() => ({
                    height: '42px',
                    display: 'flex',
                    width: '122px',
                    borderRadius: '20px',
                  })}
                >
                  {subscribeButton}
                </Button>
              </>
            )}
            {isSubmitSuccessful && (
              <Typography
                sx={(theme) => ({
                  mb: '16px',
                  color: theme.palette.text.primary,
                })}
              >
                {successMessage}
              </Typography>
            )}
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              mt: '-25px',
              maxWidth: '196px',
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
