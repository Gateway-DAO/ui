import Link from 'next/link';
import React from 'react';

import {
  GatewayIcon,
  DiscordIcon,
  SubstackIcon,
} from '@/components/atoms/icon';
import { LoadingButton } from '@/components/atoms/loading-button';
import { gqlAnonMethods } from '@/services/hasura/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaMedium } from 'react-icons/fa';

import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import {
  Box,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

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
  const {
    mutateAsync: subscribeToNewsletter,
    isSuccess,
    isLoading,
  } = useMutation(
    ['subscribeToNewsletter'],
    gqlAnonMethods.subscribe_to_newsletter
  );

  const onSubmit = async ({ email }, event) => {
    event.preventDefault();
    try {
      const response = await subscribeToNewsletter({ email_address: email });
      if (response.subscribe_to_newsletter.email) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const onError = (errors, event) => console.error(errors, event);

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
                  <Link
                    passHref
                    href="https://twitter.com/gateway_xyz"
                    target="_blank"
                  >
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
                      <SubstackIcon />
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
                <LoadingButton
                  variant="outlined"
                  isLoading={isLoading}
                  type="submit"
                  sx={() => ({
                    height: '42px',
                    display: 'flex',
                    width: '122px',
                    borderRadius: '20px',
                  })}
                >
                  {subscribeButton}
                </LoadingButton>
              </>
            )}
            {isSubmitSuccessful && isSuccess && (
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
